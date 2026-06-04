<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Resources\JsonApi\JsonApiResource;

class PaymentResource extends JsonApiResource
{
    public $attributes = [
        'id',
        'amount',
        'currency',
        'provider',
        'transaction_id',
        'status',
        'paid_at',
        'created_at',
        'updated_at',
    ];

    public $relationships = [
        'enrollment' => EnrollmentResource::class,
    ];
}
