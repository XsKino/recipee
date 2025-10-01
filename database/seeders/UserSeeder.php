<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Create admin user
        // $admin = User::create([
        //     'name' => 'Admin User',
        //     'email' => 'admin@recipee.com',
        //     'email_verified_at' => now(),
        //     'password' => Hash::make('password'),
        //     'is_admin' => true,
        // ]);


        // Create some random users using factory
        User::factory(10)->create();

        $this->command->info('User seeding completed!');
        $this->command->warn('Default password for all users: password');
    }
}
