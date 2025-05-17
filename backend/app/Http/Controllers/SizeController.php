<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Size; 

class SizeController extends Controller
{
    public function sizes()
    {
        return response()->json(Size::all());
    }
}