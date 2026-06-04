<?php

namespace App\Http\Requests\Api\V1\Lesson;

use App\Enums\LessonMaterialTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateLessonRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'module_id' => ['sometimes', 'uuid', 'exists:modules,id'],
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'duration_minutes' => ['sometimes', 'integer', 'min:1'],
            'content' => ['nullable', 'string'],
            'materials' => ['sometimes', 'array'],
            'materials.*.id' => ['sometimes', 'uuid', 'exists:lesson_materials,id'],
            'materials.*.name' => ['required_with:materials', 'string', 'max:255'],
            'materials.*.type' => ['required_with:materials', Rule::enum(LessonMaterialTypeEnum::class)],
            'materials.*.file' => ['sometimes', 'file', 'max:102400'],
            'materials.*.external_url' => ['nullable', 'url', 'max:2048'],
        ];
    }
}
