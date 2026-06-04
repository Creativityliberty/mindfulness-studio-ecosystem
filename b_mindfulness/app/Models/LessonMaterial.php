<?php

namespace App\Models;

use App\Enums\LessonMaterialTypeEnum;
use App\Media\PathGenerators\LessonMaterialPathGenerator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\Support\PathGenerator\PathGeneratorFactory;

class LessonMaterial extends Model implements Sortable , HasMedia
{
    use HasUuids, SortableTrait, InteractsWithMedia;

     protected $guarded = [];

    public $sortable = [
        'order_column_name' => 'order',
        'sort_when_creating' => true,
        'sort_on_has_many' => true,
    ];

    protected $casts = [
        'type' => LessonMaterialTypeEnum::class,
    ];

    public function lesson() : BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    } 

     protected static function booting(): void
    {
        PathGeneratorFactory::setCustomPathGenerators(
            static::class,
            LessonMaterialPathGenerator::class
        );
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('video')->singleFile();
        $this->addMediaCollection('audio')->singleFile();
        $this->addMediaCollection('pdf')->singleFile();
        $this->addMediaCollection('image')->singleFile();
    }

      public function buildSortQuery(): Builder
    {
        return static::query()->where('lesson_id', $this->lesson_id);
    }
}
