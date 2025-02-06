import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeRateComponent } from './charge-rate.component';

describe('ChargeRateComponent', () => {
  let component: ChargeRateComponent;
  let fixture: ComponentFixture<ChargeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeRateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
