<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Project;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
             'name' => 'Joao',
             'email' => 'joao@example.com',
             'password' => bcrypt('caldelas123'),

         ]);

        User::factory()->create([
            'name' => 'Maria',
            'email' => 'maria@example.com',
            'password' => bcrypt('caldelas123'),
        ]);

    }
}
