<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        
        if ($users->isEmpty()) {
            $this->command->warn('No users found. Please seed users first.');
            return;
        }

        $this->command->info('Creating recipes with ingredients...');

        // Create diverse recipes
        $recipeCount = 50;
        
        // 60% of recipes will have ingredients and reviews
        $recipesWithEverything = (int) ($recipeCount * 0.6);
        
        // 30% will have ingredients but no reviews yet
        $recipesWithIngredients = (int) ($recipeCount * 0.3);
        
        // 10% will be basic recipes (no ingredients, no reviews)
        $basicRecipes = $recipeCount - $recipesWithEverything - $recipesWithIngredients;

        // Create recipes with full features (ingredients + reviews)
        Recipe::factory($recipesWithEverything)
            ->withIngredients()
            ->withReviews()
            ->create();

        $this->command->info("Created {$recipesWithEverything} recipes with ingredients and reviews.");

        // Create recipes with just ingredients
        Recipe::factory($recipesWithIngredients)
            ->withIngredients()
            ->create();

        $this->command->info("Created {$recipesWithIngredients} recipes with ingredients only.");

        // Create basic recipes
        Recipe::factory($basicRecipes)
            ->create();

        $this->command->info("Created {$basicRecipes} basic recipes.");

        // Create a few showcase recipes with lots of positive reviews
        Recipe::factory(5)
            ->withIngredients(8) // More ingredients
            ->withPositiveReviews(10) // Lots of positive reviews
            ->create();

        $this->command->info('Created 5 showcase recipes with many positive reviews.');

        $this->command->info('Recipe seeding completed!');
    }
}
