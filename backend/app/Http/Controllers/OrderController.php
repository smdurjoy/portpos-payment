<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\InvoiceGeneratorService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function list(): JsonResponse
    {
        try {
            $orders = Order::query()->latest()->get();
            return response()->json($orders, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request, Order $order)
    {
        try {
            $requestObj = $request->all();
            $data = $this->format($requestObj);

            $order->fill($data)->save();

            $response = InvoiceGeneratorService::init()
                ->setBody($requestObj)
                ->generateInvoice();

            print_r($response);

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

    // public function generateInvoice($payload)
    // {
    //     $client = new GuzzleClient();

    //     $authorization = 'Bearer ' . base64_encode(env('PORT_POS_APP_KEY') . ':' . md5(env('PORT_POS_SECRET_KEY') . time()));

    //     $headers = [
    //         'Authorization' => $authorization,
    //     ];

    //     $raw_response = $client->post(env('PORT_POS_SANDBOX_URL'), [
    //         'headers' => $headers,
    //         'json' => $payload,
    //         'allow_redirects' => true
    //     ]);

    //     return $raw_response;
    // }

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
