<?php

namespace App\Http\Controllers;

use App\Models\Debt;
use App\Http\Requests\StoreDebtRequest;
use Illuminate\Http\Request;

class DebtController extends Controller
{
    // GET /api/debts?status=open|resolved  (default=open)
    public function index(Request $request)
    {
        $status = strtolower($request->query('status', 'open')) === 'resolved' ? 'RESOLVED' : 'OPEN';

        return Debt::where('status', $status)
            ->orderByDesc('days_overdue')
            ->get();
    }

    // POST /api/debts
    public function store(StoreDebtRequest $request)
    {
        $debt = Debt::create($request->validated());
        return response()->json($debt, 201);
    }
}
