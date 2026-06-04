<?php

namespace App\Services\Api\V1;

use App\Repositories\Api\V1\LessonRepository;
use App\Repositories\Api\V1\ModuleRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class ModuleService
{
    public function __construct(
        protected ModuleRepository $moduleRepository,
        protected LessonRepository $lessonRepository,
    ) {}

    public function getAll()
    {
        return $this->moduleRepository->all();
    }

    public function getById(string $id)
    {
        return $this->moduleRepository->getById($id);
    }

    public function save(array $data)
    {
        DB::beginTransaction();
        try {
            $lessons = $data['lessons'] ?? [];
            unset($data['lessons']);

            $module = $this->moduleRepository->save($data);

            foreach ($lessons as $lessonData) {
                $this->lessonRepository->save(array_merge($lessonData, ['module_id' => $module->id]));
            }

            DB::commit();

            return $this->moduleRepository->getById($module->id);
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to save module data');
        }
    }

    public function update(array $data, string $id)
    {
        DB::beginTransaction();
        try {
            $lessons = $data['lessons'] ?? null;
            unset($data['lessons']);

            $module = $this->moduleRepository->update($data, $id);

            if ($lessons !== null) {
                foreach ($lessons as $lessonData) {
                    if (isset($lessonData['id'])) {
                        $this->lessonRepository->update($lessonData, $lessonData['id']);
                    } else {
                        $this->lessonRepository->save(array_merge($lessonData, ['module_id' => $module->id]));
                    }
                }
            }

            DB::commit();

            return $this->moduleRepository->getById($module->id);
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to update module data');
        }
    }

    public function deleteById(string $id)
    {
        DB::beginTransaction();
        try {
            $module = $this->moduleRepository->delete($id);
            DB::commit();

            return $module;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to delete module data');
        }
    }
}
