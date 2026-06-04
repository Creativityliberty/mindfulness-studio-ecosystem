<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Resources\JsonApi\JsonApiResource;

class EnrollmentResource extends JsonApiResource
{
    public $attributes = [
        'id',
        'status',
        'enrolled_at',
        'created_at',
        'updated_at',
    ];

    public $relationships = [
        'user' => UserResource::class,
        'courseSession' => CourseSessionResource::class,
        'payment' => PaymentResource::class,
    ];
}
