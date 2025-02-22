import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSpecialInterestBillComponent } from './review-special-interest-bill.component';

describe('ReviewSpecialInterestBillComponent', () => {
  let component: ReviewSpecialInterestBillComponent;
  let fixture: ComponentFixture<ReviewSpecialInterestBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSpecialInterestBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSpecialInterestBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
