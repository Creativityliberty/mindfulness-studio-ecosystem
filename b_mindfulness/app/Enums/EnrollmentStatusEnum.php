<?php

namespace App\Enums;

enum EnrollmentStatusEnum: string
{
    case PENDING = 'pending';
    case ACTIVE = 'active';
    case CANCELLED = 'cancelled';
}
