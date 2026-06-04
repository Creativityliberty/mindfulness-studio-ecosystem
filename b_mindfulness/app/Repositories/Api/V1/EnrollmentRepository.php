<?php

namespace App\Repositories\Api\V1;

use App\Models\Enrollment;

class EnrollmentRepository
{
    public function __construct(protected Enrollment $enrollment) {}

    public function all()
    {
        return $this->enrollment->get();
    }

    public function getById(string $id): ?Enrollment
    {
        return $this->enrollment->find($id);
    }

    public function save(array $data): Enrollment
    {
        return Enrollment::create($data);
    }

    public function delete(string $id): Enrollment
    {
        $enrollment = $this->enrollment->find($id);
        $enrollment->delete();

        return $enrollment;
    }
}
