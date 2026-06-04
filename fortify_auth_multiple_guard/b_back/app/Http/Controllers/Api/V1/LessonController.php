<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Lesson\StoreLessonRequest;
use App\Http\Requests\Api\V1\Lesson\UpdateLessonRequest;
use App\Http\Resources\Api\V1\LessonResource;
use App\Services\Api\V1\LessonService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class LessonController extends Controller
{
    public function __construct(protected LessonService $lessonService) {}

    public function index(): AnonymousResourceCollection
    {
        return LessonResource::collection($this->lessonService->getAll());
    }

    public function store(StoreLessonRequest $request): LessonResource|JsonResponse
    {
        try {
            return new LessonResource($this->lessonService->save($request->validated()));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id): LessonResource
    {
        return LessonResource::make($this->lessonService->getById($id));
    }

    public function update(UpdateLessonRequest $request, string $id): LessonResource|JsonResponse
    {
        try {
            return new LessonResource($this->lessonService->update($request->validated(), $id));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->lessonService->deleteById($id);

            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
