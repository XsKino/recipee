<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $recipes = Recipe::with('user')->get();
        $users = User::all();

        if ($recipes->isEmpty() || $users->isEmpty()) {
            $this->command->warn('No recipes or users found. Please seed recipes and users first.');
            return;
        }

        $this->command->info('Creating reviews for recipes...');

        $totalReviews = 0;

        foreach ($recipes as $recipe) {
            // Get users excluding the recipe author (can't review own recipe)
            $eligibleUsers = $users->where('id', '!=', $recipe->user_id);
            
            if ($eligibleUsers->isEmpty()) {
                continue;
            }

            // Random number of reviews per recipe (0-8 reviews)
            $reviewCount = rand(0, 8);
            
            if ($reviewCount === 0) {
                continue; // Some recipes have no reviews
            }

            // Ensure we don't exceed available users
            $reviewCount = min($reviewCount, $eligibleUsers->count());
            
            // Select random users for this recipe
            $selectedUsers = $eligibleUsers->random($reviewCount);

            foreach ($selectedUsers as $user) {
                // Create varied review types
                $reviewType = rand(1, 10);
                
                if ($reviewType <= 6) {
                    // 60% positive reviews
                    Review::factory()
                        ->positive()
                        ->forRecipe($recipe)
                        ->byUser($user)
                        ->create();
                } elseif ($reviewType <= 8) {
                    // 20% neutral reviews (3 stars)
                    Review::factory()
                        ->forRecipe($recipe)
                        ->byUser($user)
                        ->state([
                            'rating' => 3,
                            'comment' => fake()->randomElement([
                                'It was okay, nothing special.',
                                'Average recipe, could be improved.',
                                'Not bad, but not great either.',
                                'Decent, might try again with modifications.',
                            ])
                        ])
                        ->create();
                } elseif ($reviewType <= 9) {
                    // 10% negative reviews
                    Review::factory()
                        ->negative()
                        ->forRecipe($recipe)
                        ->byUser($user)
                        ->create();
                } else {
                    // 10% comment-only reviews
                    Review::factory()
                        ->commentOnly()
                        ->forRecipe($recipe)
                        ->byUser($user)
                        ->create();
                }
                
                $totalReviews++;
            }
        }

        $this->command->info("Created {$totalReviews} reviews across {$recipes->count()} recipes.");
        
        // Create some additional random reviews
        Review::factory(50)->create();
        
        $this->command->info('Created 50 additional random reviews.');
        $this->command->info('Review seeding completed!');
    }
}
