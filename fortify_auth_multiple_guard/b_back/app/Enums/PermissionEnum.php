<?php

namespace App\Enums;

enum PermissionEnum: string
{
    // Users
    case VIEW_USERS = 'view-users';
    case CREATE_USERS = 'create-users';
    case UPDATE_USERS = 'update-users';
    case DELETE_USERS = 'delete-users';

    // Courses
    case VIEW_COURSES = 'view-courses';
    case CREATE_COURSES = 'create-courses';
    case UPDATE_COURSES = 'update-courses';
    case DELETE_COURSES = 'delete-courses';

    // Modules
    case VIEW_MODULES = 'view-modules';
    case CREATE_MODULES = 'create-modules';
    case UPDATE_MODULES = 'update-modules';
    case DELETE_MODULES = 'delete-modules';

    // Lessons
    case VIEW_LESSONS = 'view-lessons';
    case CREATE_LESSONS = 'create-lessons';
    case UPDATE_LESSONS = 'update-lessons';
    case DELETE_LESSONS = 'delete-lessons';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
