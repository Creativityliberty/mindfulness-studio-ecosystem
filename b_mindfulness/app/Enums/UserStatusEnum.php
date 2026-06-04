<?php

namespace App\Enums;

enum UserStatusEnum: string
{
    case ACTIVE = 'active';
    case RESTRICTED = 'restricted';
    case INACTIVE = 'inactive';

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE => 'Actif',
            self::RESTRICTED => 'Restreint',
            self::INACTIVE => 'Inactif',
        };
    }
}
