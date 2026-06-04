<?php

namespace App\Http\Requests\Api\V1\Enrollment;

use App\Enums\PaymentProviderEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEnrollmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'uuid', 'exists:users,id'],
            'course_session_id' => ['required', 'uuid', 'exists:course_sessions,id'],
            'provider' => ['required', Rule::enum(PaymentProviderEnum::class)],
            'currency' => ['sometimes', 'string', 'size:3'],
        ];
    }
}
