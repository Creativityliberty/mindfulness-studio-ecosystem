<?php

namespace App\Http\Requests\Api\V1\LessonMaterial;

use App\Enums\LessonMaterialTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLessonMaterialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lesson_id' => ['required', 'uuid', 'exists:lessons,id'],
            'materials' => ['required', 'array', 'min:1'],
            'materials.*.name' => ['required', 'string', 'max:255'],
            'materials.*.type' => ['required', Rule::enum(LessonMaterialTypeEnum::class)],
            'materials.*.file' => ['required', 'file', 'max:102400'],
            'materials.*.content' => ['nullable', 'string'],
            'materials.*.external_url' => ['nullable', 'url', 'max:2048'],
        ];
    }
}
