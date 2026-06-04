<?php

namespace App\Repositories\Api\V1;

use App\Models\Payment;

class PaymentRepository
{
    public function __construct(protected Payment $payment) {}

    public function getById(string $id): ?Payment
    {
        return $this->payment->find($id);
    }

    public function getByTransactionId(string $transactionId): ?Payment
    {
        return $this->payment->where('transaction_id', $transactionId)->first();
    }

    public function save(array $data): Payment
    {
        return Payment::create($data);
    }

    public function update(array $data, string $id): Payment
    {
        $payment = $this->payment->find($id);
        $payment->update($data);

        return $payment;
    }
}
