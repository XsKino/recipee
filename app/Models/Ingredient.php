<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    
    protected $table = 'ingredients';
    protected $casts = [
        'categories' => 'array'
    ];
    protected $fillable = ['name', 'categories'];
}
