<?php

namespace App\Repositories\Api\V1;

use App\Models\Module;

class ModuleRepository
{
    public function __construct(protected Module $module) {}

    public function all()
    {
        return $this->module->get();
    }

    public function getById(string $id): ?Module
    {
        return $this->module->find($id);
    }

    public function save(array $data): Module
    {
        return Module::create($data);
    }

    public function update(array $data, string $id): Module
    {
        $module = $this->module->find($id);
        $module->update($data);

        return $module;
    }

    public function delete(string $id): Module
    {
        $module = $this->module->find($id);
        $module->delete();

        return $module;
    }
}
