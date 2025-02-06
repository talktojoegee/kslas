import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingSpecialInterestBillsComponent } from './outstanding-special-interest-bills.component';

describe('OutstandingSpecialInterestBillsComponent', () => {
  let component: OutstandingSpecialInterestBillsComponent;
  let fixture: ComponentFixture<OutstandingSpecialInterestBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutstandingSpecialInterestBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutstandingSpecialInterestBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
