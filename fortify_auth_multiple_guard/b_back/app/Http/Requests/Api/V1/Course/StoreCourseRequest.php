<?php

namespace App\Http\Requests\Api\V1\Course;

use App\Enums\CourseStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'uuid', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'duration_weeks' => ['required', 'integer', 'min:1'],
            'status' => ['sometimes', Rule::enum(CourseStatusEnum::class)],
        ];
    }
}
