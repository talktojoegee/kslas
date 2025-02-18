import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidSpecialInterestBillsComponent } from './paid-special-interest-bills.component';

describe('PaidSpecialInterestBillsComponent', () => {
  let component: PaidSpecialInterestBillsComponent;
  let fixture: ComponentFixture<PaidSpecialInterestBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidSpecialInterestBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidSpecialInterestBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
