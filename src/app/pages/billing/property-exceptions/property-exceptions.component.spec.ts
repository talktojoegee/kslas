import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyExceptionsComponent } from './property-exceptions.component';

describe('PropertyExceptionsComponent', () => {
  let component: PropertyExceptionsComponent;
  let fixture: ComponentFixture<PropertyExceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyExceptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
