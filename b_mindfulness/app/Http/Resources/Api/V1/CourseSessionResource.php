<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\JsonApi\JsonApiResource;

class CourseSessionResource extends JsonApiResource
{

    public function toAttributes(Request $request): array    {
    return [
        'id',
        'name',
        'start_date',
        'end_date',
        'max_seats',
        'remaining_seats' => $this->remaining_seats,
        'created_at',
        'updated_at',
       ];
}

    public $relationships = [
        'course' => CourseResource::class,
        'enrollments' => EnrollmentResource::class,
    ];
}
