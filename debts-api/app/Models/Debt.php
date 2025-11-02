<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Debt extends Model
{
    protected $fillable = [
        'external_id','debtor_name','amount_eur','days_overdue','status','last_action','last_action_at'
    ];

    protected $casts = [
        'amount_eur'     => 'decimal:2',
        'days_overdue'   => 'integer',
        'last_action_at' => 'datetime',
    ];

    public function isOpen(): bool
    {
        return $this->status === 'OPEN';
    }
}
