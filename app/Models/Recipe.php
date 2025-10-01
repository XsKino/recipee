<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    protected $table = 'recipes';
    protected $fillable = ['title', 'image', 'description', 'procedure', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

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
