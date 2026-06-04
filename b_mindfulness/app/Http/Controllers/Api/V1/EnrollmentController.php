<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Enrollment\StoreEnrollmentRequest;
use App\Http\Resources\Api\V1\EnrollmentResource;
use App\Services\Api\V1\EnrollmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class EnrollmentController extends Controller
{
    public function __construct(protected EnrollmentService $enrollmentService) {}

    public function index(): AnonymousResourceCollection
    {
        return EnrollmentResource::collection($this->enrollmentService->getAll());
    }

    public function store(StoreEnrollmentRequest $request): EnrollmentResource|JsonResponse
    {
        try {
            return new EnrollmentResource($this->enrollmentService->save($request->validated()));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id): EnrollmentResource
    {
        return EnrollmentResource::make($this->enrollmentService->getById($id));
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->enrollmentService->deleteById($id);

            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
