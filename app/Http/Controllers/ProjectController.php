<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;

/**
 * Classe Responsavel por metodos referentes a projetos
 * Classe com metodos index, create, store, show, edit, update e destroy
 * Realiza a listagem dos projetos, filtrando por nome e status
 * Paginacao dos projetos
 * Criacao, atualizacao e remocao dos projetos
*/
class ProjectController extends Controller
{
    /**
     *     Inicialização: O método começa inicializando um objeto construtor de consulta para o modelo Project, que permite recuperar dados dos projetos do banco de dados.

    Filtragem: Ele verifica se há parâmetros de consulta, como name e status, na requisição para filtrar os projetos conforme necessário. Se presentes, adiciona condições à consulta para filtrar os projetos por nome (usando o operador LIKE) e status.

    Paginação: Após a filtragem, o método faz paginacao dos resultados, exibindo 10 projetos por página e mostrando um link adicional em cada lado do paginador.

    Renderização da Visualização: Por fim, retorna uma visualização, usando o framework Inertia.js, passando dados como os projetos paginados e os parâmetros de consulta da requisição para a visualização para renderização.

Resumindo, o método lida com a listagem de projetos, aplicando filtros se especificado, paginando os resultados e renderizando-os em uma visualização para exibição.
     */
    public function index()
    {
        $query = Project::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');



        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $projects = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);


        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Este método exibe o formulário para criar um novo projeto. Retorna uma visualização para criar um novo projeto.
     */
    public function create()
    {
       return inertia('Project/Create');
    }

    /**
     * Este método armazena um novo projeto na base de dados. Valida os dados recebidos, armazena a imagem (se presente) e cria o projeto na base de dados. Em seguida, redireciona para a listagem de projetos com uma mensagem de sucesso.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\uploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();

        if ($image) {
            $data['img_path'] = $image->store('images', 'public');
        }

        Project::create($data);

        return to_route('project.index')->with('success', 'Project created successfully');
    }

    /**
     * Este método exibe os detalhes de um projeto específico, incluindo suas tarefas associadas. Filtra as tarefas com base nos parametros de consulta, realiza a paginação dos resultados e retorna uma visualização dos detalhes do projeto.
     */
    public function show(Project $project)
    {
        $query = $project->tasks()->getQuery();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');



        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            ]);
    }

    /**
     * Este método exibe o formulário para editar um projeto existente. Retorna uma visualização para editar o projeto especificado.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Este método atualiza um projeto existente na base de dados. Valida os dados recebidos, atualiza a imagem (se presente) e atualiza os detalhes do projeto na base de dados. Em seguida, redireciona para a listagem de projetos com uma mensagem de sucesso.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\uploadedFile */
        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->id();

        if ($image) {
            $data['img_path'] = $image->store('images', 'public');
        }

        $project->update($data);

        return to_route('project.index')->with('success', 'Project \'' . $project->name . '\' updated successfully');
    }

    /**
     * Este método exclui um projeto da base de dados. Remove o projeto especificado da base de dados e redireciona para a listagem de projetos com uma mensagem de sucesso.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return to_route('project.index')->with('success', 'Project \'' . $project->name . '\' deleted successfully');
    }
}
