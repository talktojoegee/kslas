import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveBillsComponent } from './approve-bills.component';

describe('ApproveBillsComponent', () => {
  let component: ApproveBillsComponent;
  let fixture: ComponentFixture<ApproveBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
