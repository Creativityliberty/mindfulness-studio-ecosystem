<?php

namespace App\Http\Requests\Api\V1\CourseSession;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseSessionRequest extends FormRequest
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
            'start_date' => ['sometimes', 'date'],
            'end_date' => ['sometimes', 'date', 'after:start_date'],
            'max_seats' => ['sometimes', 'integer', 'min:1'],
        ];
    }
}
