<?php

namespace App\Models;

use App\Media\PathGenerators\CourseMediaPathGenerator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\Support\PathGenerator\PathGeneratorFactory;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Course extends Model implements Sortable, HasMedia
{
    use HasFactory, HasSlug, HasUuids, SortableTrait, InteractsWithMedia;

    protected $guarded = ['id'];

    public $sortable = [
        'order_column_name' => 'order',
        'sort_when_creating' => true,
        'sort_on_has_many' => true,
    ];

    public $casts = [
        'price' => 'decimal:2',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function modules(): HasMany
    {
        return $this->hasMany(Module::class);
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(CourseSession::class);
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()    
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function buildSortQuery(): Builder
    {
        return static::query()->where('category_id', $this->category_id);
    }

       protected static function booting(): void
    {
        PathGeneratorFactory::setCustomPathGenerators(
            static::class,
            CourseMediaPathGenerator::class
        );
    }

      public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')->singleFile();
    }
}
