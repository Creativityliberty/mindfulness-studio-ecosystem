<?php

namespace App\Services\Api\V1;

use App\Repositories\Api\V1\CourseSessionRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class CourseSessionService
{
    public function __construct(protected CourseSessionRepository $courseSessionRepository) {}

    public function getAll()
    {
        return $this->courseSessionRepository->all();
    }

    public function getById(string $id)
    {
        return $this->courseSessionRepository->getById($id);
    }

    public function save(array $data)
    {
        DB::beginTransaction();
        try {
            $session = $this->courseSessionRepository->save($data);
            DB::commit();

            return $session;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to save session data');
        }
    }

    public function update(array $data, string $id)
    {
        DB::beginTransaction();
        try {
            $session = $this->courseSessionRepository->update($data, $id);
            DB::commit();

            return $session;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to update session data');
        }
    }

    public function deleteById(string $id)
    {
        DB::beginTransaction();
        try {
            $session = $this->courseSessionRepository->delete($id);
            DB::commit();

            return $session;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to delete session data');
        }
    }
}
