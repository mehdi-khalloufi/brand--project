<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // id (BIGINT, primary)
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // foreign key to users(id)
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // foreign key to products(id)
            $table->integer('quantity'); // quantity (INTEGER)
            $table->decimal('price', 10, 2); // price (DECIMAL)
            $table->decimal('total_price', 10, 2)->nullable(); // total_price (DECIMAL, optional)
            $table->enum('status', ['PENDING', 'PAID', 'SHIPPED', 'CANCELLED']); // status (ENUM)
            $table->timestamps(); // created_at (TIMESTAMP)

            // If you need updated_at, uncomment the line below
            // $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
