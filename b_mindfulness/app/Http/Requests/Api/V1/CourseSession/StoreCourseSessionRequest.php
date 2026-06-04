<?php

namespace App\Http\Requests\Api\V1\CourseSession;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseSessionRequest extends FormRequest
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
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after:start_date'],
            'max_seats' => ['sometimes', 'integer', 'min:1'],
        ];
    }
}
