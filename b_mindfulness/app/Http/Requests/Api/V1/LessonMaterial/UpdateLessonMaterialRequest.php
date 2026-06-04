<?php

namespace App\Http\Requests\Api\V1\LessonMaterial;

use App\Enums\LessonMaterialTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateLessonMaterialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'type' => ['sometimes', Rule::enum(LessonMaterialTypeEnum::class)],
            'file' => ['sometimes', 'file', 'max:102400'],
            'external_url' => ['nullable', 'url', 'max:2048'],
        ];
    }
}
