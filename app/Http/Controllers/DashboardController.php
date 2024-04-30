<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Models\Task;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\TaskResource;

/**
* O objetivo primário desta classe é fornecer uma interface para lidar com solicitações relacionadas ao dashboard, permitindo a exibição de informações importantes sobre projetos, utilizadores e tarefas em uma única página.
*/
class DashboardController extends Controller
{
/**
*   Este método é o ponto de entrada para o controlador.
    Ele procura todos os projetos, utilizadores e tarefas na base de dados.
    Formata esses dados utilizando os recursos correspondentes.
    Retorna uma resposta para a visualização Dashboard/Index, incluindo as coleções formatadas de projetos, utilizadores e tarefas.
*/

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
