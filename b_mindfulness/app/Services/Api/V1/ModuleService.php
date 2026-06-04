<?php

namespace App\Services\Api\V1;

use App\Repositories\Api\V1\ModuleRepository;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class ModuleService
{
    public function __construct(
        protected ModuleRepository $moduleRepository,
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
        try {
            return DB::transaction(function () use ($data) {
                $module = $this->moduleRepository->save($data);

                return $this->moduleRepository->getById($module->id);
            });
        } catch (\Exception $e) {
            report($e);

            throw new InvalidArgumentException('Unable to save module data');
        }
    }

    public function update(array $data, string $id)
    {
        try {
            return DB::transaction(function () use ($data, $id) {
                $module = $this->moduleRepository->update($data, $id);

                return $this->moduleRepository->getById($module->id);
            });
        } catch (\Exception $e) {
            report($e);

            throw new InvalidArgumentException('Unable to update module data');
        }
    }

    public function deleteById(string $id)
    {
        try {
            return DB::transaction(function () use ($id) {
                return $this->moduleRepository->delete($id);
            });
        } catch (\Exception $e) {
            report($e);

            throw new InvalidArgumentException('Unable to delete module data');
        }
    }
}