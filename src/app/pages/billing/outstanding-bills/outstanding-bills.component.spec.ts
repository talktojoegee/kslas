import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingBillsComponent } from './outstanding-bills.component';

describe('OutstandingBillsComponent', () => {
  let component: OutstandingBillsComponent;
  let fixture: ComponentFixture<OutstandingBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutstandingBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutstandingBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
