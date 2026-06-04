<?php

namespace App\Services\Api\V1;

use App\Enums\EnrollmentStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Repositories\Api\V1\EnrollmentRepository;
use App\Repositories\Api\V1\PaymentRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class PaymentService
{
    public function __construct(
        protected PaymentRepository $paymentRepository,
        protected EnrollmentRepository $enrollmentRepository,
    ) {}

    public function getById(string $id)
    {
        return $this->paymentRepository->getById($id);
    }

    public function handleWebhook(string $transactionId, PaymentStatusEnum $status)
    {
        DB::beginTransaction();
        try {
            $payment = $this->paymentRepository->getByTransactionId($transactionId);

            if (! $payment) {
                throw new InvalidArgumentException("Payment not found for transaction: {$transactionId}");
            }

            $this->paymentRepository->update([
                'status' => $status,
                'paid_at' => $status === PaymentStatusEnum::PAID ? now() : null,
            ], $payment->id);

            if ($status === PaymentStatusEnum::PAID) {
                $this->enrollmentRepository->update(
                    ['status' => EnrollmentStatusEnum::ACTIVE],
                    $payment->enrollment_id,
                );
            }

            if ($status === PaymentStatusEnum::REFUNDED || $status === PaymentStatusEnum::FAILED) {
                $this->enrollmentRepository->update(
                    ['status' => EnrollmentStatusEnum::CANCELLED],
                    $payment->enrollment_id,
                );
            }

            DB::commit();

            return $this->paymentRepository->getById($payment->id);
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to process webhook');
        }
    }
}
