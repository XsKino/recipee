<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ingredient>
 */
class IngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ingredients = [
            'Salt', 'Black Pepper', 'Olive Oil', 'Garlic', 'Onion', 'Tomatoes',
            'Flour', 'Sugar', 'Butter', 'Eggs', 'Milk', 'Cheese', 'Chicken',
            'Beef', 'Rice', 'Pasta', 'Basil', 'Oregano', 'Thyme', 'Rosemary',
            'Lemon', 'Carrot', 'Celery', 'Bell Pepper', 'Mushrooms', 'Spinach',
            'Potato', 'Sweet Potato', 'Broccoli', 'Cauliflower', 'Zucchini'
        ];

        $categories = [
            ['Spices', 'Seasonings'],
            ['Oils', 'Fats'],
            ['Vegetables', 'Fresh'],
            ['Proteins', 'Meat'],
            ['Dairy'],
            ['Grains', 'Carbs'],
            ['Herbs', 'Fresh'],
            ['Produce', 'Fresh']
        ];

        return [
            'name' => $this->faker->unique()->randomElement($ingredients),
            'categories' => $this->faker->randomElements(
                $this->faker->randomElement($categories),
                $this->faker->numberBetween(1, 2)
            ),
        ];
    }
}
