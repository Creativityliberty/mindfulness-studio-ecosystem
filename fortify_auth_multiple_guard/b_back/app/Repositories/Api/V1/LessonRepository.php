<?php

namespace App\Repositories\Api\V1;

use App\Models\Lesson;

class LessonRepository
{
    public function __construct(protected Lesson $lesson) {}

    public function all()
    {
        return $this->lesson->get();
    }

    public function getById(string $id): ?Lesson
    {
        return $this->lesson->find($id);
    }

    public function save(array $data): Lesson
    {
        return Lesson::create($data);
    }

    public function update(array $data, string $id): Lesson
    {
        $lesson = $this->lesson->find($id);
        $lesson->update($data);

        return $lesson;
    }

    public function delete(string $id): Lesson
    {
        $lesson = $this->lesson->find($id);
        $lesson->delete();

        return $lesson;
    }
}
