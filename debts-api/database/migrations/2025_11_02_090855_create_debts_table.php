<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('debts', function (Blueprint $table) {
            $table->id();
            $table->string('external_id')->unique(); // must be unique
            $table->string('debtor_name');
            $table->decimal('amount_eur', 10, 2);
            $table->unsignedInteger('days_overdue');
            $table->enum('status', ['OPEN','RESOLVED'])->default('OPEN');
            $table->enum('last_action', ['SEND_REMINDER','OFFER_PAYMENT_PLAN','ESCALATE_LEGAL'])->nullable();
            $table->timestamp('last_action_at')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('debts');
    }
};
