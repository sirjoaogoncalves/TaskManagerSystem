<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use App\Models\User;



/**
 *A classe UserController é responsável por gerir as operações relacionadas aos utilizadores dentro da aplicação. Ela atua como um controlador intermediário entre as requisições HTTP e o modelo User, permitindo listar, criar, exibir, editar e excluir utilizadores.
 */
class UserController extends Controller
{
    /**
     * Responsável por listar os utlizadores.
     * Aplica filtros opcionais de nome e e-mail.
     * Realiza paginação dos resultados, exibindo 10 utilizadores por página.
     * Retorna uma visualização com os utilizadores paginados, incluindo os parâmetros de consulta e mensagens de sucesso ou erro.
     */
    public function index()
    {
        $query = User::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }

        $users = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("User/Index", [
            "users" => UserCrudResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Exibe o formulário para criar um novo utlizador.
     */
    public function create()
    {
        return inertia('User/Create');
    }

    /**
     * Armazena um novo utlizador no banco de dados.
     * Valida os dados recebidos conforme as regras definidas no StoreUserRequest.
     * Define a data de verificação de e-mail como o tempo atual.
     * Criptografa a senha antes de armazená-la na base de dados.
     * Redireciona para a página de listagem de utlizadores com uma mensagem de sucesso indicando que o utlizador foi criado com êxito.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);
        User::create($data);

        return redirect()->route('user.index')
            ->with('success', "User \"$data[name]\" was created");
    }

    /**
     * Este método não contém implementação.
     * Destaca que não haverá informações disponíveis sobre o utlizador.
     */
    public function show(User $user)
    {
        // nao vai haver informacoes sobre o utilizador
    }

    /**
     * Sxibe o formulário para editar um utilizador existente..
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserCrudResource($user),
        ]);
    }

    /**
     * Atualiza os dados de um utlizador existente na base de dados.
     * Valida os dados recebidos conforme as regras definidas no UpdateUserRequest.
     * Se uma nova senha for fornecida, ela é criptografada antes de ser atualizada.
     * Redireciona para a página de listagem de utilizadores com uma mensagem de sucesso indicando que o utilizador foi atualizado com êxito.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }
        $user->update($data);

        return to_route('user.index')
            ->with('success', "User \"$user->name\" was updated");
    }

    /**
     * Exclui um utilizador do base de dados.
     * Verifica se o utilizador possui projetos associados.
     * Se o utilizador tiver projetos, retorna um erro indicando que ele não pode ser excluído.
     * Caso contrário, exclui o usuário e redireciona para a página de listagem de uutlizadores com uma mensagem de sucesso indicando que o utilizdor foi excluído com êxito.
     */
    public function destroy(User $user)
    {
        // if user has projects it can't be deleted

        if ($user->hasProjects()) {
            return to_route('user.index')
                ->with('error', "User \"$user->name\" can't be deleted because it has projects");
        } else {
            $user->delete();
            return to_route('user.index')
                ->with('success', "User \"$user->name\" was deleted");
        }
    }
}
