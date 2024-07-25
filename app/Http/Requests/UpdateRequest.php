<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|string|unique:users,email,' . $this->id,
            'company' => 'required|string|max:255',
            'phone' => 'required|digits:11',
            'password' => [
                'confirmed',
                Password::min(5)
                    ->letters()
                    ->numbers()
                // ->mixedCase()
                // ->symbols()
                // ->uncompromised(),
            ],
            'password_confirmation' => [
                Password::min(5)->letters()
            ],
            'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,jpeg',
        ];
    }
}
