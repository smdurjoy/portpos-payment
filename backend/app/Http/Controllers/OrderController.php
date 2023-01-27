<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OrderController extends Controller
{
    public function list()
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
        $this->validate($request, [
            'product_name' => 'required',
            'product_description' => 'required',
            'amount' => 'required',
            'customer_name' => 'required',
            'customer_email' => 'required',
            'street' => 'required',
            'city' => 'required',
            'state' => 'required',
        ]);

        try {
            $order->fill($request->all())->save();
            return response()->json($order, Response::HTTP_CREATED);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
