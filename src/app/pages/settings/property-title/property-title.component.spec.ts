import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTitleComponent } from './property-title.component';

describe('PropertyTitleComponent', () => {
  let component: PropertyTitleComponent;
  let fixture: ComponentFixture<PropertyTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
