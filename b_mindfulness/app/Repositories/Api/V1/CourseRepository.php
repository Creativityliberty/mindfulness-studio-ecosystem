<?php

namespace App\Repositories\Api\V1;

use App\Models\Course;

class CourseRepository
{
    public function __construct(protected Course $course) {}

    public function all() 
    {
        return $this->course->get();
    }

    public function getById(string $id): ?Course
    {
        return $this->course->findOrFail($id);
    }

    public function save(array $data): Course
    {
        return Course::create($data);
    }

    public function update(array $data, string $id): Course
    {
        $course = $this->course->findOrFail($id);
        $course->update($data);

        return $course;
    }

    public function delete(string $id): Course
    {
        $course = $this->course->findOrFail($id);
        $course->delete();

        return $course;
    }
}
