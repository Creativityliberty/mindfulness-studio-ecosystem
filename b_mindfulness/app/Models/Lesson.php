<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Lesson extends Model implements Sortable
{
    use HasFactory, HasSlug, HasUuids, SortableTrait;

    protected $guarded = ['id'];

    public $sortable = [
        'order_column_name' => 'order', 
        'sort_when_creating' => true,
        'sort_on_has_many' => true,
    ];

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    public function materials() : HasMany
    {
        return $this->hasMany(LessonMaterial::class);
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function buildSortQuery(): Builder
    {
        return static::query()->where('module_id', $this->module_id);
    }
}
