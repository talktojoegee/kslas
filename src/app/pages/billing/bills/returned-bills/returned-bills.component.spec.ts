import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedBillsComponent } from './returned-bills.component';

describe('ReturnedBillsComponent', () => {
  let component: ReturnedBillsComponent;
  let fixture: ComponentFixture<ReturnedBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnedBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnedBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
