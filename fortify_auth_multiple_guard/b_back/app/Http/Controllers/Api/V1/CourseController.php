<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Course\StoreCourseRequest;
use App\Http\Requests\Api\V1\Course\UpdateCourseRequest;
use App\Http\Resources\Api\V1\CourseResource;
use App\Services\Api\V1\CourseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class CourseController extends Controller
{
    public function __construct(protected CourseService $courseService) {}

    public function index(): AnonymousResourceCollection
    {
        return CourseResource::collection($this->courseService->getAll());
    }

    public function store(StoreCourseRequest $request): CourseResource|JsonResponse
    {
        try {
            return new CourseResource($this->courseService->save($request->validated()));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id): CourseResource
    {
        return CourseResource::make($this->courseService->getById($id));
    }

    public function update(UpdateCourseRequest $request, string $id): CourseResource|JsonResponse
    {
        try {
            return new CourseResource($this->courseService->update($request->validated(), $id));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->courseService->deleteById($id);

            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
