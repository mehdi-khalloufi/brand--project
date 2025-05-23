<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    // Les champs remplissables (optionnel)
    protected $fillable = ['user_id', 'product_id', 'quantity', 'price', 'total_price', 'status'];

    // Relation vers l'utilisateur qui a passé la commande
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation vers le produit commandé
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Fonction statique pour récupérer toutes les commandes avec utilisateur et produit
    public static function getAllOrdersWithDetails()
    {
        return self::with(['user', 'product'])->get();
    }
}

