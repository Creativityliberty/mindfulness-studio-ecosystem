<?php

namespace App\Enums;

enum RoleEnum: string
{
    case SUPER_ADMIN = 'super-admin';
    case ADMIN = 'admin';
    case TEACHER = 'teacher';
    case STUDENT = 'student';
    case GUEST = 'guest';

    public function label(): string
    {
        return match ($this) {
            self::SUPER_ADMIN => 'Super Administrateur',
            self::ADMIN => 'Administrateur',
            self::TEACHER => 'Enseignant',
            self::STUDENT => 'Etudiant',
            self::GUEST => 'Invité',
        };
    }

    public function permissions(): array
    {
        return match ($this) {
            self::SUPER_ADMIN => PermissionEnum::cases(),

            self::ADMIN => [
                // Users
                PermissionEnum::VIEW_USERS,
                PermissionEnum::CREATE_USERS,
                PermissionEnum::UPDATE_USERS,
                PermissionEnum::DELETE_USERS,
                PermissionEnum::VIEW_COURSES,
            ],

            self::TEACHER => [
                PermissionEnum::VIEW_USERS,

                // Modules
                PermissionEnum::VIEW_MODULES,
                PermissionEnum::CREATE_MODULES,
                PermissionEnum::UPDATE_MODULES,
                PermissionEnum::DELETE_MODULES,

                // Lessons
                PermissionEnum::VIEW_LESSONS,
                PermissionEnum::CREATE_LESSONS,
                PermissionEnum::UPDATE_LESSONS,
                PermissionEnum::DELETE_LESSONS,
            ],

            self::STUDENT => [
                PermissionEnum::VIEW_COURSES,
                PermissionEnum::VIEW_LESSONS,
                PermissionEnum::VIEW_MODULES,
            ],

            self::GUEST => [
                PermissionEnum::VIEW_COURSES,
            ],
        };
    }
}
