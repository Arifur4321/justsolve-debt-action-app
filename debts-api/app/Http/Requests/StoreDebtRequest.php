<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDebtRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'external_id'  => 'required|string|max:255|unique:debts,external_id',
            'debtor_name'  => 'required|string|max:255',
            'amount_eur'   => 'required|numeric|min:0',
            'days_overdue' => 'required|integer|min:0',
            'status'       => 'sometimes|in:OPEN,RESOLVED',
        ];
    }
}
