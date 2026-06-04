<?php

namespace App\Http\Requests\Api\V1\Course;

use App\Enums\CourseStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['sometimes', 'uuid', 'exists:categories,id'],
            'name' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'duration_weeks' => ['sometimes', 'integer', 'min:1'],
            'status' => ['sometimes', Rule::enum(CourseStatusEnum::class)],
        ];
    }
}
