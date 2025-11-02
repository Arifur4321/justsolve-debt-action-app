import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsTable } from './debts-table';

describe('DebtsTable', () => {
  let component: DebtsTable;
  let fixture: ComponentFixture<DebtsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
