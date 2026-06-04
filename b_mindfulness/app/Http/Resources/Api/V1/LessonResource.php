<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Resources\JsonApi\JsonApiResource;

class LessonResource extends JsonApiResource
{
    public $attributes = [
        'id',
        'slug',
        'name',
        'description',
        'content',
        'duration_minutes',
        'created_at',
        'updated_at',
    ];

    public $relationships = [
        'module' => ModuleResource::class,
        'materials' => LessonMaterialResource::class,
    ];
}
