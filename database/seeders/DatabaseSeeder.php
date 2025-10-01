<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('🌱 Starting database seeding...');
        
        // Clear existing data (except ingredients as requested)
        $this->command->info('🧹 Clearing existing data...');
        
        // SQLite syntax for disabling foreign key constraints
        DB::statement('PRAGMA foreign_keys = OFF;');
        
        // Clear all tables except ingredients
        DB::table('reviews')->delete();
        DB::table('ingredients_x_recipes')->delete();
        DB::table('recipes')->delete();
        DB::table('users')->delete();
        
        // Reset auto increment for SQLite
        DB::statement('DELETE FROM sqlite_sequence WHERE name IN ("users", "recipes", "reviews");');
        
        DB::statement('PRAGMA foreign_keys = ON;');
        
        $this->command->info('✅ Existing data cleared (kept ingredients).');

        // Seed in proper order
        $this->command->info('👥 Seeding users...');
        $this->call(UserSeeder::class);
        
        $this->command->info('🥘 Seeding recipes...');
        $this->call(RecipeSeeder::class);
        
        $this->command->info('⭐ Seeding reviews...');
        $this->call(ReviewSeeder::class);
        
        $this->command->info('🎉 Database seeding completed successfully!');
        $this->command->info('');
        $this->command->info('📋 Summary:');
        $this->command->info('• Users: ' . DB::table('users')->count());
        $this->command->info('• Recipes: ' . DB::table('recipes')->count());
        $this->command->info('• Ingredients: ' . DB::table('ingredients')->count() . ' (preserved)');
        $this->command->info('• Reviews: ' . DB::table('reviews')->count());
        $this->command->info('• Recipe-Ingredient Relations: ' . DB::table('ingredients_x_recipes')->count());
        $this->command->info('');
        $this->command->warn('🔑 Default login credentials:');
        $this->command->warn('   Admin: admin@recipee.com / password');
        $this->command->warn('   Test:  test@recipee.com / password');
        $this->command->warn('   All users have password: password');
    }
}
