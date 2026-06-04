<?php

namespace App\Http\Requests\Api\V1\Module;

use Illuminate\Foundation\Http\FormRequest;

class UpdateModuleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'course_id' => ['sometimes', 'uuid', 'exists:courses,id'],
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'duration_minutes' => ['sometimes', 'integer', 'min:1'],
            'lessons' => ['sometimes', 'array'],
            'lessons.*.id' => ['sometimes', 'uuid', 'exists:lessons,id'],
            'lessons.*.name' => ['required_with:lessons', 'string', 'max:255'],
            'lessons.*.description' => ['nullable', 'string'],
            'lessons.*.duration_minutes' => ['required_with:lessons', 'integer', 'min:1'],
        ];
    }
}
