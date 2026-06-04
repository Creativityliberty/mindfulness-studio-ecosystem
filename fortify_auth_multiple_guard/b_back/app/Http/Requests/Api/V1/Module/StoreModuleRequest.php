<?php

namespace App\Http\Requests\Api\V1\Module;

use Illuminate\Foundation\Http\FormRequest;

class StoreModuleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'course_id' => ['required', 'uuid', 'exists:courses,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'duration_minutes' => ['required', 'integer', 'min:1'],
            'lessons' => ['sometimes', 'array'],
            'lessons.*.name' => ['required_with:lessons', 'string', 'max:255'],
            'lessons.*.description' => ['nullable', 'string'],
            'lessons.*.duration_minutes' => ['required_with:lessons', 'integer', 'min:1'],
        ];
    }
}
