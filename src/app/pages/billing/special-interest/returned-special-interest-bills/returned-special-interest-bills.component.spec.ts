import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedSpecialInterestBillsComponent } from './returned-special-interest-bills.component';

describe('ReturnedSpecialInterestBillsComponent', () => {
  let component: ReturnedSpecialInterestBillsComponent;
  let fixture: ComponentFixture<ReturnedSpecialInterestBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnedSpecialInterestBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnedSpecialInterestBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
