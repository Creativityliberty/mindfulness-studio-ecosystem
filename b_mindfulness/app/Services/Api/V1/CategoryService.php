<?php

namespace App\Services\Api\V1;

use App\Repositories\Api\V1\CategoryRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class CategoryService
{
    /**
     * @var CategoryRepository
     */
    protected $categoryRepository;

    /**
     * DummyClass constructor.
     */
    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Get all categoryRepository.
     *
     * @return string
     */
    public function getAll()
    {
        return $this->categoryRepository->all();
    }

    /**
     * Get categoryRepository by id.
     *
     * @return string
     */
    public function getById(string $id)
    {
        return $this->categoryRepository->getById($id);
    }

    /**
     * Validate categoryRepository data.
     * Store to DB if there are no errors.
     *
     * @return string
     */
    public function save(array $data)
    {
        DB::beginTransaction();
        try {
            $categoryRepository = $this->categoryRepository->save($data);
            DB::commit();

            return $categoryRepository;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to save category data');
        }
    }

    /**
     * Update categoryRepository data
     * Store to DB if there are no errors.
     *
     * @return string
     */
    public function update(array $data, string $id)
    {
        DB::beginTransaction();
        try {
            $categoryRepository = $this->categoryRepository->update($data, $id);
            DB::commit();

            return $categoryRepository;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to update category data');
        }
    }

    /**
     * Delete categoryRepository by id.
     *
     * @return string
     */
    public function deleteById(string $id)
    {
        DB::beginTransaction();
        try {
            $categoryRepository = $this->categoryRepository->delete($id);
            DB::commit();

            return $categoryRepository;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to delete category data');
        }
    }
}
