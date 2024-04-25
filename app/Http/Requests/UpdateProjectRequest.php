<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
O UpdateProjectRequest é uma classe de solicitação que define as regras de validação para os dados recebidos ao atualizar um projeto existente. Aqui está uma descrição detalhada do que cada parte do código faz:

    authorize(): Este método determina se o utilizador está autorizado a fazer esta solicitação. Retorna sempre true, o que significa que qualquer utlizador pode fazer a solicitação de atualização de projeto.

    rules(): Este método define as regras de validação para os dados recebidos na solicitação de atualização. Aqui está o que cada regra representa:
        'name': O nome do projeto é obrigatório (required), deve ser uma string (string) e ter no máximo 255 caracteres (max:255).
        'image': A imagem do projeto é opcional (nullable) e deve ser uma imagem válida.
        'description': A descrição do projeto é obrigatória (required), deve ser uma string (string) e ter no máximo 255 caracteres (max:255).
        'due_date': A data de vencimento do projeto é obrigatória (required) e deve ser uma data válida (date).
        'status': O status do projeto é obrigatório (required) e deve estar entre os valores 'pending', 'in_progress' ou 'completed', conforme especificado pela regra Rule::in(['pending', 'in_progress', 'completed']).

Essas regras garantem que os dados recebidos ao atualizar um projeto existente atendam aos critérios de validação especificados, mantendo a integridade e consistência dos dados no sistema.

*/


class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
         return [
            'name' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image'],
            'description' => ['required', 'string', 'max:255'],
            'due_date' => ['required', 'date'],
            'status' => ['required', Rule::in(['pending', 'in_progress', 'completed'])],
        ];

    }
}
