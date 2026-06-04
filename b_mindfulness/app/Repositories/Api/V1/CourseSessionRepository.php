<?php

namespace App\Repositories\Api\V1;

use App\Models\CourseSession;

class CourseSessionRepository
{
    public function __construct(protected CourseSession $courseSession) {}

    public function all()
    {
        return $this->courseSession->get();
    }

    public function getById(string $id): ?CourseSession
    {
        return $this->courseSession->find($id);
    }

    public function save(array $data): CourseSession
    {
        return CourseSession::create($data);
    }

    public function update(array $data, string $id): CourseSession
    {
        $session = $this->courseSession->find($id);
        $session->update($data);

        return $session;
    }

    public function delete(string $id): CourseSession
    {
        $session = $this->courseSession->find($id);
        $session->delete();

        return $session;
    }
}
