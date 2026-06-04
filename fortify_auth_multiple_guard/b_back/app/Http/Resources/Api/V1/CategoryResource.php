<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Resources\JsonApi\JsonApiResource;

class CategoryResource extends JsonApiResource
{
    /**
     * The resource's attributes.
     */
    public $attributes = [
        'id',
        'slug',
        'name',
        'created_at',
        'updated_at',
    ];

    public $relationships = [
        'courses' => CourseResource::class,
    ];

   /**
 * Get the resource's attributes.
 *
 * @return array<string, mixed>
 */
// public function toAttributes(Request $request): array
// {
//     return [
//         'title' => $this->title,
//         'body' => $this->body,
//         'is_published' => $this->published_at !== null,
//         'created_at' => $this->created_at,
//         'updated_at' => $this->updated_at,
//     ];
// }
}
