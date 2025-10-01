<?php

namespace Database\Factories;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $hasRating = $this->faker->boolean(85); // 85% chance of having a rating
        $hasComment = $this->faker->boolean(70); // 70% chance of having a comment
        
        // Ensure at least one of rating or comment exists
        if (!$hasRating && !$hasComment) {
            $hasRating = true;
        }

        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'recipe_id' => Recipe::inRandomOrder()->first()->id,
            'rating' => $hasRating ? $this->faker->numberBetween(1, 5) : null,
            'comment' => $hasComment ? $this->faker->paragraph() : null,
        ];
    }

    /**
     * Create a review with only a rating (no comment)
     */
    public function ratingOnly(): static
    {
        return $this->state(fn (array $attributes) => [
            'rating' => $this->faker->numberBetween(1, 5),
            'comment' => null,
        ]);
    }

    /**
     * Create a review with only a comment (no rating)
     */
    public function commentOnly(): static
    {
        return $this->state(fn (array $attributes) => [
            'rating' => null,
            'comment' => $this->faker->paragraph(),
        ]);
    }

    /**
     * Create a positive review (4-5 stars)
     */
    public function positive(): static
    {
        return $this->state(fn (array $attributes) => [
            'rating' => $this->faker->numberBetween(4, 5),
            'comment' => $this->faker->randomElement([
                'Absolutely delicious! Will definitely make this again.',
                'Amazing recipe, my family loved it!',
                'Perfect dish, easy to follow instructions.',
                'Outstanding flavors, highly recommend!',
                'This recipe exceeded my expectations.',
            ]),
        ]);
    }

    /**
     * Create a negative review (1-2 stars)
     */
    public function negative(): static
    {
        return $this->state(fn (array $attributes) => [
            'rating' => $this->faker->numberBetween(1, 2),
            'comment' => $this->faker->randomElement([
                'Not what I expected, flavors were off.',
                'Too complicated for the result.',
                'Missing some key ingredients information.',
                'Didn\'t turn out as described.',
                'Would not recommend this recipe.',
            ]),
        ]);
    }

    /**
     * Create a review for a specific recipe
     */
    public function forRecipe(Recipe $recipe): static
    {
        return $this->state(fn (array $attributes) => [
            'recipe_id' => $recipe->id,
        ]);
    }

    /**
     * Create a review by a specific user
     */
    public function byUser(User $user): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => $user->id,
        ]);
    }
}