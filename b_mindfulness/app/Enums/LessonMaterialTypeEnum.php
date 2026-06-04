<?php

namespace App\Enums;

enum LessonMaterialTypeEnum: string
{
    case VIDEO = 'video';
    case AUDIO = 'audio';
    case PDF = 'pdf';
    case IMAGE = 'image';   
}
