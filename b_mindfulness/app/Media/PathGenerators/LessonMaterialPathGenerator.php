<?php

namespace App\Media\PathGenerators;

use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;

class LessonMaterialPathGenerator implements PathGenerator
{
    public function getPath(Media $media): string
    {
        return "lessons/{$media->collection_name}s/{$media->id}/";
    }

    public function getPathForConversions(Media $media): string
    {
        return "lessons/{$media->collection_name}s/{$media->id}/conversions/";
    }

    public function getPathForResponsiveImages(Media $media): string
    {
        return "lessons/{$media->collection_name}s/{$media->id}/responsive/";
    }
}