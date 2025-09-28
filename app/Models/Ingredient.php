<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    protected $table = 'ingredients';
    protected $casts = [
        'categories' => 'array'
    ];
    protected $fillable = ['name', 'categories'];
}
