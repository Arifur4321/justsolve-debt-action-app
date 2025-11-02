<?php

namespace App\Services;

use App\Models\Debt;

class SuggestionService
{
    public function suggest(Debt $debt): array
    {
        // Rules:
        // If days_overdue ≥ 60 AND amount ≥ 1000 → ESCALATE_LEGAL
        if ($debt->days_overdue >= 60 && $debt->amount_eur >= 1000) {
            return ['action' => 'ESCALATE_LEGAL', 'reason' => '≥60 days & ≥1000€'];
        }

        // Else if days_overdue ≥ 30 → OFFER_PAYMENT_PLAN
        if ($debt->days_overdue >= 30) {
            return ['action' => 'OFFER_PAYMENT_PLAN', 'reason' => '≥30 days overdue'];
        }

        // Else → SEND_REMINDER
        return ['action' => 'SEND_REMINDER', 'reason' => '<30 days overdue'];
    }
}
