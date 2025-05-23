<?php

namespace App\Http\Controllers;


use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'size' => 'required|string|max:5',
            'category' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Gérer l'upload de l'image
        $imagePath = null;

        $imagePath = $request->file('image')->store('products', 'public');


        $product = new Product();
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->quantity = $request->input('quantity');
        $product->size = $request->input('size');
        $product->category = $request->input('category');
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }
        $product->created_by = $user->id; // Assuming user is authenticated
        $product->image_url = $imagePath ? asset('storage/' . $imagePath) : null; // Enregistrer l'URL de l'image
        $product->save();

        return response()->json(['message' => 'Produit ajouté avec succès', 'product' => $product], 201);
    }
    public function products()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Produit non trouvé.'], 404);
        }

        // Extraire le chemin de l'image à partir de l'URL
        if ($product->image_url) {
            // Récupère le chemin après 'storage/' dans l'URL
            $imagePath = parse_url($product->image_url, PHP_URL_PATH);  // Exemple: /storage/products/bNVbwauQLoSVeE2cqJhXYMGf0nGv69i2rvkRSYy6.jpg
            $imagePath = public_path() . $imagePath; // Convertit en chemin absolu

            if (file_exists($imagePath)) {
                unlink($imagePath);  // Supprime le fichier de storage
            }
        }

        // Supprimer le produit de la base de données
        $product->delete();

        return response()->json(['message' => 'Produit supprimé avec succès.']);
    }


    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $request->merge([
            'price' => (float)$request->price,
            'quantity' => (int)$request->quantity
        ]);
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric',
                'quantity' => 'required|integer',
                'size' => 'required|string|max:5',
                'category' => 'required|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->quantity = $request->quantity;
        $product->size = $request->size;
        $product->category = $request->category;

        if ($request->hasFile('image')) {
            if ($product->image_url) {
                $imagePath = parse_url($product->image_url, PHP_URL_PATH);
                $fullPath = public_path($imagePath);

                if (file_exists($fullPath)) {
                    unlink($fullPath);
                }
            }

            $imagePath = $request->file('image')->store('products', 'public');
            $product->image_url = asset('storage/' . $imagePath);
        }

        $product->save();

        return response()->json([
            'message' => 'Produit mis à jour avec succès',
            'product' => $product
        ]);
    }

    public function productsByName(Request $request)
    {
        $name = $request->query('name');

        if (!$name) {
            return response()->json(['error' => 'Missing "name" query parameter.'], 400);
        }

        $products = Product::where('name', $name)->get();

        if ($products->isEmpty()) {
            return response()->json(['error' => 'No products found with that name.'], 404);
        }

        $grouped = [
            'name' => $products->first()->name,
            'image_url' => $products->first()->image_url,
            'price' => $products->first()->price,
            'sizes' => $products->pluck('size')->unique()->values(),
            'products' => $products, // full list of matching products
        ];

        return response()->json($grouped);
    }

    public function prodcount()
    {
        dd('prodcount hit');
        $count = Product::count();
        return response()->json(['count' => $count]);
    }
}
