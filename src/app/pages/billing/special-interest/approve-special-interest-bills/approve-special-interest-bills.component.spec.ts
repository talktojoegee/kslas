import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSpecialInterestBillsComponent } from './approve-special-interest-bills.component';

describe('ApproveSpecialInterestBillsComponent', () => {
  let component: ApproveSpecialInterestBillsComponent;
  let fixture: ComponentFixture<ApproveSpecialInterestBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveSpecialInterestBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveSpecialInterestBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
