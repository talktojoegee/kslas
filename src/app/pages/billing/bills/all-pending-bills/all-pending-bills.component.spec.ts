import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPendingBillsComponent } from './all-pending-bills.component';

describe('AllPendingBillsComponent', () => {
  let component: AllPendingBillsComponent;
  let fixture: ComponentFixture<AllPendingBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPendingBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPendingBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
