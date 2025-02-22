import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgaOutstandingBillsComponent } from './lga-outstanding-bills.component';

describe('LgaOutstandingBillsComponent', () => {
  let component: LgaOutstandingBillsComponent;
  let fixture: ComponentFixture<LgaOutstandingBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LgaOutstandingBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LgaOutstandingBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
