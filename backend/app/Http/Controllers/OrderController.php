<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    // List all orders
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    // Show single order
    public function show($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return response()->json($order);
    }

    // Create order
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:user,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'status' => ['required', Rule::in(['PENDING', 'PAID', 'SHIPPED', 'CANCELLED'])],
            // total_price is optional, but we can calculate it here
        ]);

        $validated['total_price'] = $validated['price'] * $validated['quantity'];


        $order = Order::create($validated);

        return response()->json($order, 201);
    }

    // Update order (mainly for status or quantity)
    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $validated = $request->validate([
            'quantity' => 'sometimes|integer|min:1',
            'price' => 'sometimes|numeric|min:0',
            'status' => ['sometimes', Rule::in(['PENDING', 'PAID', 'SHIPPED', 'CANCELLED'])],
        ]);

        if (isset($validated['quantity'])) {
            $order->quantity = $validated['quantity'];
        }
        if (isset($validated['price'])) {
            $order->price = $validated['price'];
        }

        // Recalculate total price if quantity or price changed
        if (isset($validated['quantity']) || isset($validated['price'])) {
            $order->total_price = $order->price * $order->quantity;
        }

        if (isset($validated['status'])) {
            $order->status = $validated['status'];
        }

        $order->save();

        return response()->json($order);
    }

    // Delete order
    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }
    // Get orders by user ID
    public function getByUserId($userId)
    {
        $orders = Order::with('product')->where('user_id', $userId)->get();

        if ($orders->isEmpty()) {
            return response()->json(['message' => 'No orders found for this user'], 404);
        }

        return response()->json($orders);
    }
}
