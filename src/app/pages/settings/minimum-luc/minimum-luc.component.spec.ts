import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumLucComponent } from './minimum-luc.component';

describe('MinimumLucComponent', () => {
  let component: MinimumLucComponent;
  let fixture: ComponentFixture<MinimumLucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimumLucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimumLucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
