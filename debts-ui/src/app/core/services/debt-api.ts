import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Debt, DebtAction } from '../models/debt';
import { Suggestion } from '../models/suggestion';

// Point to your Laravel API (change if your host/port differs)
const API_BASE = 'http://127.0.0.1:8000/api';

@Injectable({ providedIn: 'root' })
export class DebtApiService {
  constructor(private http: HttpClient) {}

  list(status: 'open'|'resolved' = 'open'): Observable<Debt[]> {
    return this.http.get<Debt[]>(`${API_BASE}/debts`, { params: { status } as any });
  }

  suggestion(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${API_BASE}/debts/${id}/suggestion`);
  }

  apply(id: number, action: DebtAction) {
    return this.http.post<{ ok: boolean; debt: Debt }>(`${API_BASE}/debts/${id}/apply`, { action });
  }
}
