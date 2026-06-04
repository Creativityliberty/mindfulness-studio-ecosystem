<?php

namespace App\Http\Responses;

use App\Http\Resources\Api\V1\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): JsonResponse|RedirectResponse
    {
        $user = Auth::guard('admin')->user() ?? Auth::guard('web')->user();

        return $request->wantsJson()
            ? response()->json([
                'two_factor' => false,
                'user' => UserResource::make($user),
            ])
            : redirect()->intended(config('fortify.home'));
    }
}
