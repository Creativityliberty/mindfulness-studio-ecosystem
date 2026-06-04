<?php

namespace App\Services\Api\V1;

use App\Enums\EnrollmentStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Repositories\Api\V1\EnrollmentRepository;
use App\Repositories\Api\V1\PaymentRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class EnrollmentService
{
    public function __construct(
        protected EnrollmentRepository $enrollmentRepository,
        protected PaymentRepository $paymentRepository,
    ) {}

    public function getAll()
    {
        return $this->enrollmentRepository->all();
    }

    public function getById(string $id)
    {
        return $this->enrollmentRepository->getById($id);
    }

    public function save(array $data)
    {
        DB::beginTransaction();
        try {
            $enrollment = $this->enrollmentRepository->save([
                'user_id' => $data['user_id'],
                'course_session_id' => $data['course_session_id'],
                'status' => EnrollmentStatusEnum::PENDING,
            ]);

            $session = $enrollment->courseSession;

            $this->paymentRepository->save([
                'enrollment_id' => $enrollment->id,
                'amount' => $session->course->price,
                'currency' => $data['currency'] ?? 'EUR',
                'provider' => $data['provider'],
                'status' => PaymentStatusEnum::PENDING,
            ]);

            DB::commit();

            return $this->enrollmentRepository->getById($enrollment->id);
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to save enrollment data');
        }
    }

    public function deleteById(string $id)
    {
        DB::beginTransaction();
        try {
            $enrollment = $this->enrollmentRepository->delete($id);
            DB::commit();

            return $enrollment;
        } catch (Exception $e) {
            DB::rollBack();
            report($e);
            throw new InvalidArgumentException('Unable to delete enrollment data');
        }
    }
}
