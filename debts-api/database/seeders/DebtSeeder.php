<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Debt;

class DebtSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            // LEGAL: ≥60 days & ≥1000€
            ['INV-1001','Mario Rossi',1200.00,72,'OPEN'],
            // PLAN: ≥30 days
            ['INV-1002','Lucia Bianchi',450.50,45,'OPEN'],
            // REMINDER: <30
            ['INV-1003','ACME S.p.A.',300.00,12,'OPEN'],
            // Another LEGAL
            ['INV-1004','Globex GmbH',2500.00,90,'OPEN'],
            // Resolved (hidden by default)
            ['INV-1005','Umbrella Ltd',180.00,25,'RESOLVED'],
            // Boundary: 60 days but <1000 → PLAN
            ['INV-1006','Beta SRL',500.00,60,'OPEN'],
        ];

        foreach ($rows as [$ext,$name,$amt,$days,$status]) {
            Debt::create([
                'external_id'  => $ext,
                'debtor_name'  => $name,
                'amount_eur'   => $amt,
                'days_overdue' => $days,
                'status'       => $status,
            ]);
        }
    }
}
