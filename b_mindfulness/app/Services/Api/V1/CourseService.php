<?php

namespace App\Services\Api\V1;

use App\Repositories\Api\V1\CourseRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use Illuminate\Http\UploadedFile;

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

    public function save(array $data, ?UploadedFile $image = null)
    {
        DB::beginTransaction();
        try {
            $course = $this->courseRepository->save(collect($data)->except('image')->toArray());
            if ($image) {
                $course->addMedia($image)->toMediaCollection('image');
            }
            DB::commit();

            return $course;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to save course data');
        }
    }

    public function update(array $data, string $id, ?UploadedFile $image = null)
    {
        DB::beginTransaction();
        try {
            $course = $this->courseRepository->update(collect($data)->except('image')->toArray(), $id);
            if ($image) {
                $course->addMedia($image)->toMediaCollection('image');
            }
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
