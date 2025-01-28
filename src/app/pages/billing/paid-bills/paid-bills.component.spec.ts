import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidBillsComponent } from './paid-bills.component';

describe('PaidBillsComponent', () => {
  let component: PaidBillsComponent;
  let fixture: ComponentFixture<PaidBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
