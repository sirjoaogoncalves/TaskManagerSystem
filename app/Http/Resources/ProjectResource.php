<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;


/**
Classe de recurso que transforma um objeto do modelo Project num array formatado para ser retornado como resposta em uma API. Aqui está uma descrição detalhada do que cada parte do código faz:

    *$wrap = false: Desativa o "envelope" padrão que envolveria os recursos em uma chave com o nome da classe do recurso. Isso significa que os dados serão retornados diretamente como um array, sem uma chave de nível superior.

    *toArray(Request $request): Este método transforma o objeto do modelo Project em um array formatado. Aqui está o que cada chave do array representa:
        'id': O identificador único do projeto.
        'name': O nome do projeto.
        'description': A descrição do projeto.
        'created_at': A data de criação do projeto formatada como 'Y-m-d' (ano-mês-dia).
        'due_date': A data de vencimento do projeto formatada como 'Y-m-d' (ano-mês-dia).
        'status': O status atual do projeto.
        'img_path': O caminho da imagem do projeto, se existir, convertido em uma URL acessível usando o facade Storage.
        'created_by': Um objeto UserResource que representa o usuário que criou o projeto.
        'updated_by': Um objeto UserResource que representa o usuário que atualizou o projeto pela última vez.
        
     *Este ProjectResource é útil para fornecer uma representação consistente e formatada dos projetos ao serem retornados em respostas de API.
*/

class ProjectResource extends JsonResource
{

    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'status' => $this->status,
            'img_path' => $this->img_path ? Storage::url($this->img_path) : null,
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
        ];
    }
}
