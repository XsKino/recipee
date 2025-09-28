<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $table = 'recipes';
    protected $fillable = ['title', 'image', 'description', 'procedure'];

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'ingredients_x_recipes', 'recipe_id', 'ingredient_id')
                    ->withPivot(['quantity', 'unit'])
                    ->withTimestamps();
    }
    public function reviews()
    {
        return $this->hasMany(Review::class, 'recipe_id');
    }
    public function averageRating()
    {
        // where rating is not null
        return $this->reviews()->whereNotNull('rating')->avg('rating');
    }
}
