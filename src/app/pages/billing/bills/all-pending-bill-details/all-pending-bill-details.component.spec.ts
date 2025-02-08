import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPendingBillDetailsComponent } from './all-pending-bill-details.component';

describe('AllPendingBillDetailsComponent', () => {
  let component: AllPendingBillDetailsComponent;
  let fixture: ComponentFixture<AllPendingBillDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPendingBillDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPendingBillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
