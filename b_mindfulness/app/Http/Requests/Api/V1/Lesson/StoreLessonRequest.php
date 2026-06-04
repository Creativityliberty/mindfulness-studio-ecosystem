<?php

namespace App\Http\Requests\Api\V1\Lesson;

use App\Enums\LessonMaterialTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLessonRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'module_id' => ['required', 'uuid', 'exists:modules,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'duration_minutes' => ['required', 'integer', 'min:1'],
            'content' => ['nullable', 'string'],
            'materials' => ['sometimes', 'array'],
            'materials.*.name' => ['required_with:materials', 'string', 'max:255'],
            'materials.*.type' => ['required_with:materials', Rule::enum(LessonMaterialTypeEnum::class)],
            'materials.*.file' => ['required_with:materials', 'file', 'max:102400'],
            'materials.*.external_url' => ['nullable', 'url', 'max:2048'],
        ];
    }
}
