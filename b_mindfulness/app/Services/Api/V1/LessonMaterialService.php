<?php

namespace App\Services\Api\V1;

use App\Repositories\Api\V1\LessonMaterialRepository;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class LessonMaterialService
{
    public function __construct(protected LessonMaterialRepository $lessonMaterialRepository) {}

    public function getAll()
    {
        return $this->lessonMaterialRepository->all();
    }

    public function getById(string $id)
    {
        return $this->lessonMaterialRepository->getById($id);
    }

    public function saveMany(string $lessonId, array $materials)
    {
        DB::beginTransaction();
        try {
            $created = [];

            foreach ($materials as $materialData) {
                /** @var UploadedFile|null $file */
                $file = $materialData['file'] ?? null;

                $record = $this->lessonMaterialRepository->save([
                    'lesson_id' => $lessonId,
                    'name' => $materialData['name'],
                    'type' => $materialData['type'],
                    'content' => $materialData['content'] ?? null,
                    'external_url' => $materialData['external_url'] ?? null,
                ]);

                if ($file instanceof UploadedFile) {
                    $record->addMedia($file)->toMediaCollection($materialData['type']);
                }

                $created[] = $record;
            }

            DB::commit();

            return $created;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to save lesson materials');
        }
    }

    public function update(array $data, string $id)
    {
        DB::beginTransaction();
        try {
            $file = $data['file'] ?? null;
            unset($data['file']);

            $material = $this->lessonMaterialRepository->update($data, $id);

            if ($file instanceof UploadedFile) {
                $type = is_string($material->type) ? $material->type : $material->type->value;
                $material->clearMediaCollection($type);
                $material->addMedia($file)->toMediaCollection($type);
            }

            DB::commit();

            return $material;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to update lesson material');
        }
    }

    public function deleteById(string $id)
    {
        DB::beginTransaction();
        try {
            $material = $this->lessonMaterialRepository->delete($id);
            DB::commit();

            return $material;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to delete lesson material');
        }
    }
}
