import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillProcessingComponent } from './bill-processing.component';

describe('BillProcessingComponent', () => {
  let component: BillProcessingComponent;
  let fixture: ComponentFixture<BillProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillProcessingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
