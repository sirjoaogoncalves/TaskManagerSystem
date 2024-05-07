<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use App\Models\Team;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $user1 = User::create([
            'name' => 'João Gonçalves',
            'email' => 'joao@example.com',
            'password' => bcrypt('password'),
        ]);

        $user2 = User::create([
            'name' => 'Maria Silva',
            'email' => 'maria@example.com',
            'password' => bcrypt('password'),
        ]);

        $user3 = User::create([
            'name' => 'Manuel Santos',
            'email' => 'manuel@example.com',
            'password' => bcrypt('password'),
        ]);

        $user4 = User::create([
            'name' => 'Ana Rodrigues',
            'email' => 'ana@example.com',
            'password' => bcrypt('password'),
        ]);

        $user5 = User::create([
            'name' => 'Luísa Fernandes',
            'email' => 'luisa@example.com',
            'password' => bcrypt('password'),
        ]);

        $projectNames = [
            'Development of Financial Management Application',
            'Implementation of Stock Control System',
            'Construction of E-commerce Website',
            'Development of Social Networking Application',
            'IT Infrastructure Modernization Project',
            'Development of Online Education Platform',
            'Implementation of Human Resources Management System',
            'Development of Delivery Application',
            'Business Process Restructuring Project',
            'Construction of Travel Reservation Platform'
        ];
        $projects = [];
        foreach ($projectNames as $name) {
            $projects[] = Project::create([
                'name' => $name,
                'description' => "This is project \"$name\".",
                'created_by' => rand(1, 5),
                'status' => ['pending', 'in_progress', 'completed'][rand(0, 2)],
                'due_date' => now()->addDays(rand(1, 30)),
                'updated_by' => rand(1, 5),
            ]);
        }

        // Criar 30 tarefas e misturá-las entre os utilizadores e projetos
        $users = [$user1, $user2, $user3, $user4, $user5];
        for ($i = 1; $i <= 30; $i++) {
            $userIndex = rand(0, 4);
            $projectIndex = rand(0, 9);
            Task::create([
                'name' => "Task $i",
                'description' => "This is task $i.",
                'project_id' => $projects[$projectIndex]->id,
                'created_by' => $users[$userIndex]->id,
                'updated_by' => $users[$userIndex]->id,
                'assigned_user_id' => $users[rand(0, 4)]->id,
                'status' => ['pending', 'in_progress', 'completed'][rand(0, 2)],
                'priority' => ['low', 'medium', 'high'][rand(0, 2)],
                'due_date' => now()->addDays(rand(1, 30)),
            ]);
        }
    }
}
