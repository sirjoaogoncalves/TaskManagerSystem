<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;

/**
*A classe TaskController é responsável por gerir as operações relacionadas às tarefas dentro da aplicação. Ela atua como um intermediário entre as requisições HTTP e o modelo Task, permitindo listar, criar, exibir, editar e excluir tarefas.
*/

class TaskController extends Controller
{
    /**
     * Lista as tarefas, aplicando filtros opcionais de nome e status, e paginando os resultados para exibição. Retorna uma visualização com as tarefas paginadas, incluindo os parâmetros de consulta e mensagens de sucesso ou erro.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');



        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);


        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'error' => session('error'),
        ]);

    }

    /**
     *     Exibe o formulário para criar uma tarefa, fornecendo também a lista de projetos e utilizadores disponíveis.
     */
    public function create()
    {
        $projects = Project::all();
        $users = User::all();

        return inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     *     Armazena uma nova tarefa na base de dados após validar os dados recebidos. Armazena também a imagem associada, se houver. Redireciona para a página de listagem de tarefas com uma mensagem de sucesso.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\uploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();

        if ($image) {
            $data['img_path'] = $image->store('images', 'public');
        }

        Task::create($data);

        return to_route('task.index')->with('success', 'Task created successfully');
    }

    /**
     * Exibe os detalhes de uma tarefa específica.
     */
    public function show(Task $task)
    {

        return inertia('Task/Show', [
            'task' => new TaskResource($task),
            ]);
    }

    /**
     * Exibe o formulário para editar uma tarefa existente, fornecendo também a lista de projetos e utilizadores disponíveis.
     */
    public function edit(Task $task)
    {
        $projects = Project::all();
        $users = User::all();

        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     *     Atualiza os dados de uma tarefa existente na base de dados após validar os dados recebidos. Atualiza também a imagem associada, se houver. Redireciona para a página de listagem de tarefas com uma mensagem de sucesso.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\uploadedFile */
        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->id();

        if ($image) {
            $data['img_path'] = $image->store('images', 'public');
        }

        $task->update($data);

        return to_route('task.index')->with('success', 'Task \'' . $task->name . '\' updated successfully');
    }

    /**
     *     Exclui uma tarefa do banco de dados. Redireciona para a página de listagem de tarefas com uma mensagem de sucesso indicando que a tarefa foi excluída com êxito.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return to_route('task.index')->with('success', 'Task \'' . $task->name . '\' deleted successfully');
    }

    /**
    *     Lista as tarefas atribuídas ao utilizador autenticado, aplicando os mesmos filtros opcionais de nome e status. Retorna uma visualização com as tarefas paginadas, incluindo os parâmetros de consulta e mensagens de sucesso ou erro.
    */

    public function myTasks()
    {
        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');



        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);


        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'error' => session('error'),
        ]);

    }
}
