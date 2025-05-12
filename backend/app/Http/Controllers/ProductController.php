<?php

namespace App\Http\Controllers;


use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
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
}
