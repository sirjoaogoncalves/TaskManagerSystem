<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
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
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
