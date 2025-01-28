import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectedBillsComponent } from './objected-bills.component';

describe('ObjectedBillsComponent', () => {
  let component: ObjectedBillsComponent;
  let fixture: ComponentFixture<ObjectedBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectedBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectedBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
