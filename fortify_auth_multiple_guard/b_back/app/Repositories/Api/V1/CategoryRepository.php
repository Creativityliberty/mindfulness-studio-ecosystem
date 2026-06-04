<?php

namespace App\Repositories\Api\V1;

use App\Models\Category;

class CategoryRepository
{
    protected Category $category;

    /**
     * Category constructor.
     */
    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    /**
     * Get all category.
     *
     * @return Category $category
     */
    public function all()
    {
        return $this->category->get();
    }

    /**
     * Get category by id
     *
     * @return mixed
     */
    public function getById(string $id)
    {
        return $this->category->find($id);
    }

    /**
     * Save Category
     *
     * @return Category
     */
    public function save(array $data)
    {
        return Category::create($data);
    }

    /**
     * Update Category
     *
     * @return Category
     */
    public function update(array $data, string $id)
    {
        $category = $this->category->find($id);
        $category->update($data);

        return $category;
    }

    /**
     * Delete Category
     *
     * @param  $data
     * @return Category
     */
    public function delete(string $id)
    {
        $category = $this->category->find($id);
        $category->delete();

        return $category;
    }
}
