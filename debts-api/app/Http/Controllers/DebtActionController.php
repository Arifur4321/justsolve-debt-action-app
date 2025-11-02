<?php

namespace App\Http\Controllers;

use App\Models\Debt;
use App\Services\SuggestionService;
use App\Http\Requests\ApplyActionRequest;
use Illuminate\Http\JsonResponse;

class DebtActionController extends Controller
{
    public function __construct(private SuggestionService $suggestions) {}

    // GET /api/debts/{id}/suggestion
    public function suggestion(int $id): JsonResponse
    {
        $debt = Debt::findOrFail($id);
        return response()->json($this->suggestions->suggest($debt));
    }

    // POST /api/debts/{id}/apply
    public function apply(ApplyActionRequest $request, int $id): JsonResponse
    {
        $debt = Debt::findOrFail($id);

        if (!$debt->isOpen()) {
            return response()->json([
                'ok' => false,
                'error' => 'Debt is resolved; action not applied.'
            ], 409);
        }

        $debt->last_action    = $request->validated()['action'];
        $debt->last_action_at = now();
        $debt->save();

        return response()->json(['ok' => true, 'debt' => $debt]);
    }
}
