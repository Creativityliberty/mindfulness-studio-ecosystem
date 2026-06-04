<?php

namespace App\Services\Api\V1;

use App\Repositories\Api\V1\LessonMaterialRepository;
use App\Repositories\Api\V1\LessonRepository;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class LessonService
{
    public function __construct(
        protected LessonRepository $lessonRepository,
        protected LessonMaterialRepository $lessonMaterialRepository,
    ) {}

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
            $materials = $data['materials'] ?? [];
            unset($data['materials']);

            $lesson = $this->lessonRepository->save($data);

            foreach ($materials as $materialData) {
                /** @var UploadedFile|null $file */
                $file = $materialData['file'] ?? null;

                $material = $this->lessonMaterialRepository->save([
                    'lesson_id' => $lesson->id,
                    'name' => $materialData['name'],
                    'type' => $materialData['type'],
                    'external_url' => $materialData['external_url'] ?? null,
                ]);

                if ($file instanceof UploadedFile) {
                    $material->addMedia($file)->toMediaCollection($materialData['type']);
                }
            }

            DB::commit();

            return $this->lessonRepository->getById($lesson->id);
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
            $materials = $data['materials'] ?? null;
            unset($data['materials']);

            $lesson = $this->lessonRepository->update($data, $id);

            if ($materials !== null) {
                foreach ($materials as $materialData) {
                    /** @var UploadedFile|null $file */
                    $file = $materialData['file'] ?? null;

                    if (isset($materialData['id'])) {
                        $material = $this->lessonMaterialRepository->update(collect($materialData)->except(['id', 'file'])->toArray(), $materialData['id']);
                    } else {
                        $material = $this->lessonMaterialRepository->save([
                            'lesson_id' => $lesson->id,
                            'name' => $materialData['name'],
                            'type' => $materialData['type'],
                            'external_url' => $materialData['external_url'] ?? null,
                        ]);
                    }

                    if ($file instanceof UploadedFile) {
                        $type = is_string($material->type) ? $material->type : $material->type->value;
                        $material->clearMediaCollection($type);
                        $material->addMedia($file)->toMediaCollection($type);
                    }
                }
            }

            DB::commit();

            return $this->lessonRepository->getById($lesson->id);
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
