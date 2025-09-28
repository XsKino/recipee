<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ingredients = [
            // Vegetables
            ['name' => 'Tomatoes', 'categories' => ['vegetable', 'fresh']],
            ['name' => 'Onions', 'categories' => ['vegetable', 'aromatic']],
            ['name' => 'Garlic', 'categories' => ['vegetable', 'aromatic']],
            ['name' => 'Bell Peppers', 'categories' => ['vegetable', 'fresh']],
            ['name' => 'Carrots', 'categories' => ['vegetable', 'root']],
            ['name' => 'Potatoes', 'categories' => ['vegetable', 'root', 'carb']],
            ['name' => 'Sweet Potatoes', 'categories' => ['vegetable', 'root', 'carb']],
            ['name' => 'Spinach', 'categories' => ['vegetable', 'leafy']],
            ['name' => 'Kale', 'categories' => ['vegetable', 'leafy', 'superfood']],
            ['name' => 'Lettuce', 'categories' => ['vegetable', 'leafy', 'salad']],
            ['name' => 'Broccoli', 'categories' => ['vegetable', 'cruciferous']],
            ['name' => 'Cauliflower', 'categories' => ['vegetable', 'cruciferous']],
            ['name' => 'Brussels Sprouts', 'categories' => ['vegetable', 'cruciferous']],
            ['name' => 'Cabbage', 'categories' => ['vegetable', 'cruciferous']],
            ['name' => 'Mushrooms', 'categories' => ['vegetable', 'umami']],
            ['name' => 'Zucchini', 'categories' => ['vegetable', 'summer_squash']],
            ['name' => 'Eggplant', 'categories' => ['vegetable', 'nightshade']],
            ['name' => 'Cucumber', 'categories' => ['vegetable', 'fresh', 'hydrating']],
            ['name' => 'Celery', 'categories' => ['vegetable', 'aromatic', 'low_calorie']],
            ['name' => 'Asparagus', 'categories' => ['vegetable', 'spring']],
            ['name' => 'Green Beans', 'categories' => ['vegetable', 'fresh']],
            ['name' => 'Peas', 'categories' => ['vegetable', 'legume']],
            ['name' => 'Corn', 'categories' => ['vegetable', 'grain', 'sweet']],
            ['name' => 'Beets', 'categories' => ['vegetable', 'root', 'earthy']],
            ['name' => 'Radishes', 'categories' => ['vegetable', 'root', 'peppery']],
            ['name' => 'Turnips', 'categories' => ['vegetable', 'root']],
            ['name' => 'Leeks', 'categories' => ['vegetable', 'aromatic']],
            ['name' => 'Shallots', 'categories' => ['vegetable', 'aromatic']],
            ['name' => 'Scallions', 'categories' => ['vegetable', 'aromatic', 'mild']],
            ['name' => 'Artichokes', 'categories' => ['vegetable', 'Mediterranean']],

            // Proteins
            ['name' => 'Chicken Breast', 'categories' => ['protein', 'meat', 'lean']],
            ['name' => 'Chicken Thighs', 'categories' => ['protein', 'meat']],
            ['name' => 'Ground Beef', 'categories' => ['protein', 'meat']],
            ['name' => 'Beef Steak', 'categories' => ['protein', 'meat', 'premium']],
            ['name' => 'Ground Turkey', 'categories' => ['protein', 'meat', 'lean']],
            ['name' => 'Pork Chops', 'categories' => ['protein', 'meat']],
            ['name' => 'Bacon', 'categories' => ['protein', 'meat', 'cured']],
            ['name' => 'Ham', 'categories' => ['protein', 'meat', 'cured']],
            ['name' => 'Lamb', 'categories' => ['protein', 'meat', 'gamey']],
            ['name' => 'Duck', 'categories' => ['protein', 'meat', 'rich']],
            ['name' => 'Salmon', 'categories' => ['protein', 'fish', 'omega3']],
            ['name' => 'Tuna', 'categories' => ['protein', 'fish']],
            ['name' => 'Cod', 'categories' => ['protein', 'fish', 'white']],
            ['name' => 'Shrimp', 'categories' => ['protein', 'seafood']],
            ['name' => 'Crab', 'categories' => ['protein', 'seafood', 'premium']],
            ['name' => 'Lobster', 'categories' => ['protein', 'seafood', 'luxury']],
            ['name' => 'Scallops', 'categories' => ['protein', 'seafood', 'delicate']],
            ['name' => 'Mussels', 'categories' => ['protein', 'seafood']],
            ['name' => 'Eggs', 'categories' => ['protein', 'versatile']],
            ['name' => 'Tofu', 'categories' => ['protein', 'vegetarian', 'soy']],
            ['name' => 'Tempeh', 'categories' => ['protein', 'vegetarian', 'fermented']],

            // Dairy
            ['name' => 'Milk', 'categories' => ['dairy', 'liquid']],
            ['name' => 'Heavy Cream', 'categories' => ['dairy', 'rich']],
            ['name' => 'Butter', 'categories' => ['dairy', 'fat', 'baking']],
            ['name' => 'Cheese (Cheddar)', 'categories' => ['dairy', 'cheese', 'sharp']],
            ['name' => 'Mozzarella', 'categories' => ['dairy', 'cheese', 'mild']],
            ['name' => 'Parmesan', 'categories' => ['dairy', 'cheese', 'hard']],
            ['name' => 'Feta', 'categories' => ['dairy', 'cheese', 'brined']],
            ['name' => 'Goat Cheese', 'categories' => ['dairy', 'cheese', 'tangy']],
            ['name' => 'Cream Cheese', 'categories' => ['dairy', 'cheese', 'soft']],
            ['name' => 'Greek Yogurt', 'categories' => ['dairy', 'fermented', 'healthy']],
            ['name' => 'Sour Cream', 'categories' => ['dairy', 'tangy']],

            // Grains & Carbs
            ['name' => 'Rice (White)', 'categories' => ['grain', 'carb', 'staple']],
            ['name' => 'Rice (Brown)', 'categories' => ['grain', 'carb', 'whole_grain']],
            ['name' => 'Quinoa', 'categories' => ['grain', 'protein', 'superfood']],
            ['name' => 'Pasta', 'categories' => ['grain', 'carb']],
            ['name' => 'Bread', 'categories' => ['grain', 'carb', 'baked']],
            ['name' => 'Oats', 'categories' => ['grain', 'breakfast', 'fiber']],
            ['name' => 'Barley', 'categories' => ['grain', 'chewy']],
            ['name' => 'Couscous', 'categories' => ['grain', 'quick']],
            ['name' => 'Bulgur', 'categories' => ['grain', 'middle_eastern']],

            // Legumes & Nuts
            ['name' => 'Black Beans', 'categories' => ['legume', 'protein', 'fiber']],
            ['name' => 'Kidney Beans', 'categories' => ['legume', 'protein']],
            ['name' => 'Chickpeas', 'categories' => ['legume', 'protein', 'versatile']],
            ['name' => 'Lentils', 'categories' => ['legume', 'protein', 'quick_cook']],
            ['name' => 'Almonds', 'categories' => ['nut', 'healthy_fat', 'protein']],
            ['name' => 'Walnuts', 'categories' => ['nut', 'omega3']],
            ['name' => 'Cashews', 'categories' => ['nut', 'creamy']],
            ['name' => 'Peanuts', 'categories' => ['nut', 'protein']],
            ['name' => 'Pine Nuts', 'categories' => ['nut', 'delicate', 'expensive']],

            // Fruits
            ['name' => 'Lemon', 'categories' => ['fruit', 'citrus', 'acidic']],
            ['name' => 'Lime', 'categories' => ['fruit', 'citrus', 'tart']],
            ['name' => 'Orange', 'categories' => ['fruit', 'citrus', 'sweet']],
            ['name' => 'Grapefruit', 'categories' => ['fruit', 'citrus', 'bitter']],
            ['name' => 'Avocado', 'categories' => ['fruit', 'healthy_fat', 'creamy']],
            ['name' => 'Apples', 'categories' => ['fruit', 'sweet', 'crisp']],
            ['name' => 'Bananas', 'categories' => ['fruit', 'sweet', 'potassium']],
            ['name' => 'Berries (Mixed)', 'categories' => ['fruit', 'antioxidant', 'sweet']],

            // Oils & Fats
            ['name' => 'Olive Oil', 'categories' => ['oil', 'healthy_fat', 'mediterranean']],
            ['name' => 'Coconut Oil', 'categories' => ['oil', 'tropical', 'saturated']],
            ['name' => 'Vegetable Oil', 'categories' => ['oil', 'neutral', 'cooking']],
            ['name' => 'Sesame Oil', 'categories' => ['oil', 'aromatic', 'asian']],

            // Herbs
            ['name' => 'Basil', 'categories' => ['herb', 'aromatic', 'fresh']],
            ['name' => 'Parsley', 'categories' => ['herb', 'fresh', 'garnish']],
            ['name' => 'Cilantro', 'categories' => ['herb', 'fresh', 'aromatic']],
            ['name' => 'Oregano', 'categories' => ['herb', 'dried', 'mediterranean']],
            ['name' => 'Thyme', 'categories' => ['herb', 'aromatic']],
            ['name' => 'Rosemary', 'categories' => ['herb', 'aromatic', 'woody']],
            ['name' => 'Sage', 'categories' => ['herb', 'earthy']],
            ['name' => 'Dill', 'categories' => ['herb', 'fresh', 'delicate']],
            ['name' => 'Chives', 'categories' => ['herb', 'mild', 'onion_family']],
            ['name' => 'Mint', 'categories' => ['herb', 'fresh', 'cooling']],

            // Spices & Seasonings
            ['name' => 'Salt', 'categories' => ['seasoning', 'basic', 'essential']],
            ['name' => 'Black Pepper', 'categories' => ['spice', 'pungent']],
            ['name' => 'Paprika', 'categories' => ['spice', 'mild', 'colorful']],
            ['name' => 'Cumin', 'categories' => ['spice', 'earthy', 'warm']],
            ['name' => 'Chili Powder', 'categories' => ['spice', 'hot', 'blend']],
            ['name' => 'Turmeric', 'categories' => ['spice', 'anti_inflammatory', 'golden']],
            ['name' => 'Cinnamon', 'categories' => ['spice', 'sweet', 'warm']],
            ['name' => 'Nutmeg', 'categories' => ['spice', 'warm', 'baking']],
            ['name' => 'Cloves', 'categories' => ['spice', 'strong', 'aromatic']],
            ['name' => 'Cardamom', 'categories' => ['spice', 'floral', 'expensive']],
            ['name' => 'Ginger', 'categories' => ['spice', 'aromatic', 'medicinal']],
            ['name' => 'Bay Leaves', 'categories' => ['spice', 'aromatic', 'slow_cook']],

            // Baking & Sweeteners
            ['name' => 'Flour (All-Purpose)', 'categories' => ['baking', 'grain', 'staple']],
            ['name' => 'Sugar (White)', 'categories' => ['sweetener', 'baking', 'refined']],
            ['name' => 'Brown Sugar', 'categories' => ['sweetener', 'baking', 'molasses']],
            ['name' => 'Honey', 'categories' => ['sweetener', 'natural', 'floral']],
            ['name' => 'Maple Syrup', 'categories' => ['sweetener', 'natural', 'rich']],
            ['name' => 'Vanilla Extract', 'categories' => ['flavoring', 'baking', 'sweet']],
            ['name' => 'Baking Powder', 'categories' => ['baking', 'leavening']],
            ['name' => 'Baking Soda', 'categories' => ['baking', 'leavening', 'alkali']],
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::updateOrCreate(
                ['name' => $ingredient['name']], // Search criteria
                $ingredient // Data to create/update
            );
        }
    }
}
