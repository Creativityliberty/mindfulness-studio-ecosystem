<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Category\StoreCategoryRequest;
use App\Http\Requests\Api\V1\Category\UpdateCategoryRequest;
use App\Http\Resources\Api\V1\CategoryResource;
use App\Services\Api\V1\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    protected CategoryService $categoryService;

    /**
     * DummyModel Constructor
     */
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index(): AnonymousResourceCollection
    {
        return CategoryResource::collection($this->categoryService->getAll());
    }

    public function store(StoreCategoryRequest $request): CategoryResource|JsonResponse
    {
        try {
            return new CategoryResource($this->categoryService->save($request->validated()));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id): CategoryResource
    {
        return CategoryResource::make($this->categoryService->getById($id));
    }

    public function update(UpdateCategoryRequest $request, string $id): CategoryResource|JsonResponse
    {
        try {
            return new CategoryResource($this->categoryService->update($request->validated(), $id));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->categoryService->deleteById($id);

            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
