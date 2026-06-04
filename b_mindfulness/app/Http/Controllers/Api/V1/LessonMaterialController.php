<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\LessonMaterial\StoreLessonMaterialRequest;
use App\Http\Requests\Api\V1\LessonMaterial\UpdateLessonMaterialRequest;
use App\Http\Resources\Api\V1\LessonMaterialResource;
use App\Services\Api\V1\LessonMaterialService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class LessonMaterialController extends Controller
{
    public function __construct(protected LessonMaterialService $lessonMaterialService) {}

    public function index(): AnonymousResourceCollection
    {
        return LessonMaterialResource::collection($this->lessonMaterialService->getAll());
    }

    public function store(StoreLessonMaterialRequest $request): AnonymousResourceCollection|JsonResponse
    {
        try {
            $materials = $this->lessonMaterialService->saveMany(
                $request->validated('lesson_id'),
                $request->validated('materials'),
            );

            return LessonMaterialResource::collection(collect($materials));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id): LessonMaterialResource
    {
        return LessonMaterialResource::make($this->lessonMaterialService->getById($id));
    }

    public function update(UpdateLessonMaterialRequest $request, string $id): LessonMaterialResource|JsonResponse
    {
        try {
            return new LessonMaterialResource($this->lessonMaterialService->update($request->validated(), $id));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->lessonMaterialService->deleteById($id);

            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
