<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recipe>
 */
class RecipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'image' => $this->generatePlaceholderImageUrl(),
            'description' => $this->faker->paragraph(),
            'procedure' => $this->faker->paragraphs(3, true),
            'user_id' => \App\Models\User::inRandomOrder()->first()->id
        ];
    }

    /**
     * Generate a placeholder image URL using reliable services
     * (Same logic as UpdateFakeRecipeImages command)
     */
    private function generatePlaceholderImageUrl(): string
    {
        $width = rand(400, 600);
        $height = rand(300, 400);
        
        $colors = ['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8', 'F7DC6F', 'BB8FCE', '85C1E9'];
        $bgColor = $colors[array_rand($colors)];
        
        $words = ['Recipe', 'Delicious', 'Tasty', 'Yummy', 'Fresh', 'Healthy', 'Dish', 'Food'];
        $text = $words[array_rand($words)];
        
        // Using same services as UpdateFakeRecipeImages command
        $services = [
            "https://picsum.photos/{$width}/{$height}?random=" . rand(1, 1000),
            "https://dummyimage.com/{$width}x{$height}/{$bgColor}/ffffff&text={$text}"
        ];
        
        return $services[array_rand($services)];
    }

    /**
     * Add ingredients to the recipe after creation
     */
    public function withIngredients($count = null): static
    {
        return $this->afterCreating(function (\App\Models\Recipe $recipe) use ($count) {
            $ingredientCount = $count ?? $this->faker->numberBetween(3, 8);
            
            // Get random ingredients
            $ingredients = \App\Models\Ingredient::inRandomOrder()
                ->limit($ingredientCount)
                ->get();

            // If not enough ingredients exist, create some
            if ($ingredients->count() < $ingredientCount) {
                $needed = $ingredientCount - $ingredients->count();
                for ($i = 0; $i < $needed; $i++) {
                    $ingredients->push(\App\Models\Ingredient::factory()->create());
                }
            }

            // Attach ingredients with pivot data
            foreach ($ingredients as $ingredient) {
                $recipe->ingredients()->attach($ingredient->id, [
                    'quantity' => $this->faker->randomFloat(2, 0.25, 5),
                    'unit' => $this->faker->randomElement([
                        'cups', 'tbsp', 'tsp', 'oz', 'lbs', 'grams', 'ml', 
                        'liters', 'pieces', 'cloves', 'slices'
                    ]),
                ]);
            }
        });
    }

    /**
     * Create recipe with specific ingredients
     */
    public function withSpecificIngredients(array $ingredientData): static
    {
        return $this->afterCreating(function (\App\Models\Recipe $recipe) use ($ingredientData) {
            foreach ($ingredientData as $data) {
                $ingredientId = $data['ingredient_id'] ?? 
                    \App\Models\Ingredient::inRandomOrder()->first()->id;
                
                $recipe->ingredients()->attach($ingredientId, [
                    'quantity' => $data['quantity'] ?? $this->faker->randomFloat(2, 0.25, 5),
                    'unit' => $data['unit'] ?? $this->faker->randomElement([
                        'cups', 'tbsp', 'tsp', 'oz', 'lbs', 'grams', 'ml'
                    ]),
                ]);
            }
        });
    }

    /**
     * Add reviews to the recipe after creation
     */
    public function withReviews($count = null): static
    {
        return $this->afterCreating(function (\App\Models\Recipe $recipe) use ($count) {
            $reviewCount = $count ?? $this->faker->numberBetween(2, 8);
            
            // Get users excluding the recipe author
            $eligibleUsers = \App\Models\User::where('id', '!=', $recipe->user_id)->get();
            
            if ($eligibleUsers->isEmpty()) {
                return; // No eligible users to create reviews
            }
            
            // Don't exceed available users
            $reviewCount = min($reviewCount, $eligibleUsers->count());
            
            // Select random users
            $selectedUsers = $eligibleUsers->random($reviewCount);
            
            foreach ($selectedUsers as $user) {
                // Create varied review types (70% positive, 20% neutral, 10% negative)
                $reviewType = $this->faker->numberBetween(1, 10);
                
                if ($reviewType <= 7) {
                    // 70% positive reviews
                    \App\Models\Review::factory()
                        ->positive()
                        ->forRecipe($recipe)
                        ->byUser($user)
                        ->create();
                } elseif ($reviewType <= 9) {
                    // 20% neutral reviews
                    \App\Models\Review::factory()
                        ->forRecipe($recipe)
                        ->byUser($user)
                        ->state([
                            'rating' => 3,
                            'comment' => $this->faker->randomElement([
                                'It was okay, nothing special.',
                                'Average recipe, could be improved.',
                                'Not bad, but not great either.',
                            ])
                        ])
                        ->create();
                } else {
                    // 10% negative reviews
                    \App\Models\Review::factory()
                        ->negative()
                        ->forRecipe($recipe)
                        ->byUser($user)
                        ->create();
                }
            }
        });
    }

    /**
     * Create recipe with specific number of positive reviews
     */
    public function withPositiveReviews($count = 5): static
    {
        return $this->afterCreating(function (\App\Models\Recipe $recipe) use ($count) {
            $eligibleUsers = \App\Models\User::where('id', '!=', $recipe->user_id)
                ->inRandomOrder()
                ->limit($count)
                ->get();
                
            foreach ($eligibleUsers as $user) {
                \App\Models\Review::factory()
                    ->positive()
                    ->forRecipe($recipe)
                    ->byUser($user)
                    ->create();
            }
        });
    }
}
