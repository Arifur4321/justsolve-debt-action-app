<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApplyActionRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'action' => 'required|in:SEND_REMINDER,OFFER_PAYMENT_PLAN,ESCALATE_LEGAL',
        ];
    }
}
