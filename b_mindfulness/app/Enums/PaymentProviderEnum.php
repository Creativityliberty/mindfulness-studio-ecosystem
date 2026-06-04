<?php

namespace App\Enums;

enum PaymentProviderEnum: string
{
    case PAYPAL = 'paypal';
    case STRIPE = 'stripe';
}
