import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAssessmentValueComponent } from './property-assessment-value.component';

describe('PropertyAssessmentValueComponent', () => {
  let component: PropertyAssessmentValueComponent;
  let fixture: ComponentFixture<PropertyAssessmentValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyAssessmentValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyAssessmentValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
