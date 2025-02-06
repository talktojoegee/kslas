import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialInterestBillDetailComponent } from './special-interest-bill-detail.component';

describe('SpecialInterestBillDetailComponent', () => {
  let component: SpecialInterestBillDetailComponent;
  let fixture: ComponentFixture<SpecialInterestBillDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialInterestBillDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialInterestBillDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
