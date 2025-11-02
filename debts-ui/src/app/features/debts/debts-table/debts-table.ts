import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Debt, DebtAction } from '../../../core/models/debt';
import { DebtApiService } from '../../../core/services/debt-api';

@Component({
  selector: 'app-debts-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSelectModule, MatSnackBarModule],
  template: `
    <div class="toolbar">
      <button mat-button (click)="load()">Reload</button>
      <mat-select [(value)]="status" (selectionChange)="load()">
        <mat-option value="open">Open</mat-option>
        <mat-option value="resolved">Resolved</mat-option>
      </mat-select>
    </div>

    <table mat-table [dataSource]="rows()" class="mat-elevation-z2">
      <ng-container matColumnDef="debtor">
        <th mat-header-cell *matHeaderCellDef>Debtor</th>
        <td mat-cell *matCellDef="let d">{{ d.debtor_name }}</td>
      </ng-container>

      <ng-container matColumnDef="amount">
        <th mat-header-cell *matHeaderCellDef>Amount (€)</th>
        <td mat-cell *matCellDef="let d">{{ d.amount_eur }}</td>
      </ng-container>

      <ng-container matColumnDef="days">
        <th mat-header-cell *matHeaderCellDef>Days Overdue</th>
        <td mat-cell *matCellDef="let d">{{ d.days_overdue }}</td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let d">{{ d.status }}</td>
      </ng-container>

      <ng-container matColumnDef="lastAction">
        <th mat-header-cell *matHeaderCellDef>Last Action</th>
        <td mat-cell *matCellDef="let d">{{ d.last_action || '—' }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let d">
          <button mat-button (click)="getSuggestion(d)">Get Suggestion</button>
          <mat-select placeholder="Apply action" (selectionChange)="apply(d, $event.value)">
            <mat-option value="SEND_REMINDER">SEND_REMINDER</mat-option>
            <mat-option value="OFFER_PAYMENT_PLAN">OFFER_PAYMENT_PLAN</mat-option>
            <mat-option value="ESCALATE_LEGAL">ESCALATE_LEGAL</mat-option>
          </mat-select>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols;"></tr>
    </table>
  `,
  styles: [`
    .toolbar { display:flex; gap:12px; align-items:center; margin:12px 0; }
    table { width: 100%; }
  `]
})
export class DebtsTableComponent implements OnInit {
  rows = signal<Debt[]>([]);
  cols = ['debtor','amount','days','status','lastAction','actions'];
  status: 'open'|'resolved' = 'open';

  constructor(private api: DebtApiService, private snack: MatSnackBar) {}

  ngOnInit() { this.load(); }

  load() {
    this.api.list(this.status).subscribe({
      next: data => this.rows.set(data),
      error: _ => this.snack.open('Failed to load debts', 'Close', { duration: 3000 })
    });
  }

  getSuggestion(d: Debt) {
    this.api.suggestion(d.id).subscribe({
      next: s => this.snack.open(`Suggested: ${s.action} — ${s.reason}`, 'Close', { duration: 4000 }),
      error: _ => this.snack.open('Failed to get suggestion', 'Close', { duration: 3000 })
    });
  }

  apply(d: Debt, action: DebtAction) {
    this.api.apply(d.id, action).subscribe({
      next: res => {
        this.snack.open('Action applied', 'Close', { duration: 3000 });
        // update the row in-place with returned debt
        const updated = this.rows().map(r => r.id === d.id ? { ...r, ...res.debt } : r);
        this.rows.set(updated);
      },
      error: _ => this.snack.open('Failed to apply', 'Close', { duration: 3000 })
    });
  }
}
