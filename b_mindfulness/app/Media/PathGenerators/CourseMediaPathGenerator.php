<?php

namespace App\Media\PathGenerators;

use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;

class CourseMediaPathGenerator implements PathGenerator
{
    public function getPath(Media $media): string
    {
        return "courses/images/{$media->id}/";
    }

    public function getPathForConversions(Media $media): string
    {
        return "courses/images/{$media->id}/conversions/";
    }

    public function getPathForResponsiveImages(Media $media): string
    {
        return "courses/images/{$media->id}/responsive/";
    }
}
