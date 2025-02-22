import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLgaComponent } from './dashboard-lga.component';

describe('DashboardLgaComponent', () => {
  let component: DashboardLgaComponent;
  let fixture: ComponentFixture<DashboardLgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLgaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
