<?php

namespace App\Services\Api\V1;

use App\Repositories\Api\V1\CourseRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class CourseService
{
    public function __construct(protected CourseRepository $courseRepository) {}

    public function getAll()
    {
        return $this->courseRepository->all();
    }

    public function getById(string $id)
    {
        return $this->courseRepository->getById($id);
    }

    public function save(array $data)
    {
        DB::beginTransaction();
        try {
            $course = $this->courseRepository->save($data);
            DB::commit();

            return $course;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to save course data');
        }
    }

    public function update(array $data, string $id)
    {
        DB::beginTransaction();
        try {
            $course = $this->courseRepository->update($data, $id);
            DB::commit();

            return $course;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to update course data');
        }
    }

    public function deleteById(string $id)
    {
        DB::beginTransaction();
        try {
            $course = $this->courseRepository->delete($id);
            DB::commit();

            return $course;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to delete course data');
        }
    }
}
