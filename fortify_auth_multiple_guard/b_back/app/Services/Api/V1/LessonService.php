<?php

namespace App\Services\Api\V1;

use App\Repositories\Api\V1\LessonRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class LessonService
{
    public function __construct(protected LessonRepository $lessonRepository) {}

    public function getAll()
    {
        return $this->lessonRepository->all();
    }

    public function getById(string $id)
    {
        return $this->lessonRepository->getById($id);
    }

    public function save(array $data)
    {
        DB::beginTransaction();
        try {
            $lesson = $this->lessonRepository->save($data);
            DB::commit();

            return $lesson;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to save lesson data');
        }
    }

    public function update(array $data, string $id)
    {
        DB::beginTransaction();
        try {
            $lesson = $this->lessonRepository->update($data, $id);
            DB::commit();

            return $lesson;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to update lesson data');
        }
    }

    public function deleteById(string $id)
    {
        DB::beginTransaction();
        try {
            $lesson = $this->lessonRepository->delete($id);
            DB::commit();

            return $lesson;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to delete lesson data');
        }
    }
}
