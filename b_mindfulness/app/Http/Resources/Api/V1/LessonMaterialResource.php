<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\JsonApi\JsonApiResource;

class LessonMaterialResource extends JsonApiResource
{
    public function toAttributes(Request $request): array    {
    return [
             'id'           => $this->id,
            'name'         => $this->name,
            'type'         => $this->type,
            'external_url' => $this->external_url,
            'file_url'     => $this->getFirstMediaUrl($this->type->value),
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,
       ];
}

    public $relationships = [
        'lesson' => LessonResource::class,
    ];
}
