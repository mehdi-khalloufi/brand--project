<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'price', 'quantity', 'size', 'image_url', 'category_id', 'created_by'
    ];
    public function sizes()
{
    return $this->belongsToMany(Size::class, 'product_size');
}
}
