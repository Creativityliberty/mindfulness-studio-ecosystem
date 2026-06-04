<?php

namespace App\Repositories\Api\V1;

use App\Models\LessonMaterial;

class LessonMaterialRepository
{
    public function __construct(protected LessonMaterial $lesson) {}

    public function all()
    {
        return $this->lesson->get();
    }

    public function getById(string $id): ?LessonMaterial    
    {
        return $this->lesson->find($id);
    }

    public function save(array $data): LessonMaterial
    {
        return LessonMaterial::create($data);
    }

    public function update(array $data, string $id): LessonMaterial
    {
        $lesson = $this->lesson->find($id);
        $lesson->update($data);

        return $lesson;
    }

    public function delete(string $id): LessonMaterial
    {
        $lesson = $this->lesson->find($id);
        $lesson->delete();

        return $lesson;
    }
}
