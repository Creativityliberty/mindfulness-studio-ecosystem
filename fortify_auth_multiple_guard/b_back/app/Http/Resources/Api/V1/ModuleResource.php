<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Resources\JsonApi\JsonApiResource;

class ModuleResource extends JsonApiResource
{
    public $attributes = [
        'id',
        'slug',
        'name',
        'description',
        'duration_minutes',
        'order',
        'created_at',
        'updated_at',
    ];

    public $relationships = [
        'course' => CourseResource::class,
        'lessons' => LessonResource::class,
    ];
}
