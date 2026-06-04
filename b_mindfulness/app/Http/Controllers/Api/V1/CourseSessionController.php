<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\CourseSession\StoreCourseSessionRequest;
use App\Http\Requests\Api\V1\CourseSession\UpdateCourseSessionRequest;
use App\Http\Resources\Api\V1\CourseSessionResource;
use App\Services\Api\V1\CourseSessionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class CourseSessionController extends Controller
{
    public function __construct(protected CourseSessionService $courseSessionService) {}

    public function index(): AnonymousResourceCollection
    {
        return CourseSessionResource::collection($this->courseSessionService->getAll());
    }

    public function store(StoreCourseSessionRequest $request): CourseSessionResource|JsonResponse
    {
        try {
            return new CourseSessionResource($this->courseSessionService->save($request->validated()));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id): CourseSessionResource
    {
        return CourseSessionResource::make($this->courseSessionService->getById($id));
    }

    public function update(UpdateCourseSessionRequest $request, string $id): CourseSessionResource|JsonResponse
    {
        try {
            return new CourseSessionResource($this->courseSessionService->update($request->validated(), $id));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->courseSessionService->deleteById($id);

            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
