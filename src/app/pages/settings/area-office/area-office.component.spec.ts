import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaOfficeComponent } from './area-office.component';

describe('AreaOfficeComponent', () => {
  let component: AreaOfficeComponent;
  let fixture: ComponentFixture<AreaOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaOfficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
