<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Module\StoreModuleRequest;
use App\Http\Requests\Api\V1\Module\UpdateModuleRequest;
use App\Http\Resources\Api\V1\ModuleResource;
use App\Services\Api\V1\ModuleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class ModuleController extends Controller
{
    public function __construct(protected ModuleService $moduleService) {}

    public function index(): AnonymousResourceCollection
    {
        return ModuleResource::collection($this->moduleService->getAll());
    }

    public function store(StoreModuleRequest $request): ModuleResource|JsonResponse
    {
        try {
            return new ModuleResource($this->moduleService->save($request->validated()));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id): ModuleResource
    {
        return ModuleResource::make($this->moduleService->getById($id));
    }

    public function update(UpdateModuleRequest $request, string $id): ModuleResource|JsonResponse
    {
        try {
            return new ModuleResource($this->moduleService->update($request->validated(), $id));
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->moduleService->deleteById($id);

            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);

            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
