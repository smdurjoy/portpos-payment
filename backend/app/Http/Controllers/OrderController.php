<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\InvoiceGeneratorService;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function list(): JsonResponse
    {
        try {
            $orders = Order::query()->latest()->get();
            return response()->json($orders, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @param Order $order
     * @return JsonResponse
     */
    public function store(Request $request, Order $order): JsonResponse
    {
        try {
            $requestObj = $request->all();
            $data = $this->format($requestObj);

            $order->fill($data)->save();

            $response = InvoiceGeneratorService::init()
                ->setBody($request->except('token'))
                ->generateInvoice();

            if ($response->getStatusCode() === 201) {
                $body = json_decode($response->getBody()->getContents(), true);
                if (isset($body['data']['invoice_id'])) {
                    $order->invoice_id = $body['data']['invoice_id'];
                    $order->payment_link = $body['data']['action']['url'];
                }
                $order->save();
            }

            return response()->json([
                'client_response' => $response,
                'order_details' => $order
            ], Response::HTTP_CREATED);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function updateStaus(Request $request): JsonResponse
    {
        try {
            $order = Order::query()->findOrFail($request->get('orderId'));
            $order->status = $request->get('status');
            $order->save();
            return response()->json($order, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getOrderIPNDetails(Request $request): JsonResponse
    {
        try {
            $order = Order::query()->find($request->get('orderId'));
            $invoiceId = $order['invoice_id'];
            $amount = $order['amount'];
            $response = InvoiceGeneratorService::init()->getIPN($invoiceId, $amount);
            $resBody = json_decode($response->getBody()->getContents(), true);
            return response()->json($this->formatIpnResponse($resBody, $order), Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * format ipn response for frontend
     * @param $response
     * @return array
     */
    private function formatIpnResponse($response, $order): array
    {
        return [
            'invoice_no' => $response['data']['invoice_id'] ?? null,
            'invoice_date' => date('d-m-Y', strtotime($order['created_at'])),
            'payment_url' => $order['payment_link'],
            'amount' => $response['data']['order']['amount'] ?? null,
            'currency' => $response['data']['order']['currency'] ?? null,
            'status' => $response['data']['order']['status'] ?? null,
            'product_name' => $response['data']['product']['name'] ?? null,
            'product_description' => $response['data']['product']['description'] ?? null,
            'customer_name' => $response['data']['billing']['customer']['name'] ?? null,
            'customer_email' => $response['data']['billing']['customer']['email'] ?? null,
            'customer_phone' => $response['data']['billing']['customer']['phone'] ?? null,
            'customer_street' => $response['data']['billing']['customer']['address']['street'] ?? null,
            'customer_city' => $response['data']['billing']['customer']['address']['city'] ?? null,
            'customer_state' => $response['data']['billing']['customer']['address']['state'] ?? null,
            'customer_zipcode' => $response['data']['billing']['customer']['address']['zipcode'] ?? null,
            'customer_country' => $response['data']['billing']['customer']['address']['country'] ?? "Bangladesh",
        ];
    }

    /**
     * format request data for order store
     * @param $requestObj
     * @return array
     */
    private function format($requestObj): array
    {
        return [
            'product_name' => $requestObj['product']['name'],
            'product_description' => $requestObj['product']['description'],
            'amount' => $requestObj['order']['amount'],
            'customer_name' => $requestObj['billing']['customer']['name'],
            'customer_email' => $requestObj['billing']['customer']['email'],
            'customer_phone' => $requestObj['billing']['customer']['phone'],
            'street' => $requestObj['billing']['customer']['address']['street'],
            'city' => $requestObj['billing']['customer']['address']['city'],
            'state' => $requestObj['billing']['customer']['address']['state'],
            'zipcode' => $requestObj['billing']['customer']['address']['zipcode'],
            'country' => $requestObj['billing']['customer']['address']['country'],
        ];
    }
}
