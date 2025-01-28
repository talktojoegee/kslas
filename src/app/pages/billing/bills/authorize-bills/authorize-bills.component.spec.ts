import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeBillsComponent } from './authorize-bills.component';

describe('AuthorizeBillsComponent', () => {
  let component: AuthorizeBillsComponent;
  let fixture: ComponentFixture<AuthorizeBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizeBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
