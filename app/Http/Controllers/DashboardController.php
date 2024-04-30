<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Models\Task;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\TaskResource;

class DashboardController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        $users = User::all();
        $tasks = Task::all();

        return inertia('Dashboard/Index', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
            'tasks' => TaskResource::collection($tasks),
        ]);
    }
}
