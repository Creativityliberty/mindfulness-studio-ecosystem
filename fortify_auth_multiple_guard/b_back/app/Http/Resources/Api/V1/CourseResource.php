<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Resources\JsonApi\JsonApiResource;

class CourseResource extends JsonApiResource
{
    public $attributes = [
        'id',
        'slug',
        'name',
        'description',
        'price',
        'duration_weeks',
        'status',
        'created_at',
        'updated_at',
    ];

    public $relationships = [
        'modules' => ModuleResource::class,
        'category' => CategoryResource::class,
    ];
}
