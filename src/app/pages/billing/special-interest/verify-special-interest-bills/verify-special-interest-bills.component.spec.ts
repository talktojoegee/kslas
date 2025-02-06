import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySpecialInterestBillsComponent } from './verify-special-interest-bills.component';

describe('VerifySpecialInterestBillsComponent', () => {
  let component: VerifySpecialInterestBillsComponent;
  let fixture: ComponentFixture<VerifySpecialInterestBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifySpecialInterestBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifySpecialInterestBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
