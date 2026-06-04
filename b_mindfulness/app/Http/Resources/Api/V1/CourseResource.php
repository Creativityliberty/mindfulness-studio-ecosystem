<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\JsonApi\JsonApiResource;

class CourseResource extends JsonApiResource
{
public function toAttributes(Request $request): array    {
    return [
        'id',
        'slug',
        'name',
        'description',
        'price',
        'duration_weeks',
        'status',
        'image' => $this->getFirstMediaUrl('image'),
        'created_at',
        'updated_at',
       ];
}

    public $relationships = [
        'modules' => ModuleResource::class,
        'category' => CategoryResource::class,
    ];
}
