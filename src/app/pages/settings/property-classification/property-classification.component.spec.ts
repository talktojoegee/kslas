import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyClassificationComponent } from './property-classification.component';

describe('PropertyClassificationComponent', () => {
  let component: PropertyClassificationComponent;
  let fixture: ComponentFixture<PropertyClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyClassificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
