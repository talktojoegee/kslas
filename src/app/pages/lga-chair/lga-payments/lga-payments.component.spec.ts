import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgaPaymentsComponent } from './lga-payments.component';

describe('LgaPaymentsComponent', () => {
  let component: LgaPaymentsComponent;
  let fixture: ComponentFixture<LgaPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LgaPaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LgaPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
