export type DebtStatus = 'OPEN'|'RESOLVED';
export type DebtAction = 'SEND_REMINDER'|'OFFER_PAYMENT_PLAN'|'ESCALATE_LEGAL';

export interface Debt {
  id: number;
  external_id: string;
  debtor_name: string;
  amount_eur: number;
  days_overdue: number;
  status: DebtStatus;
  last_action?: DebtAction | null;
  last_action_at?: string | null;
  created_at?: string;
  updated_at?: string;
}
