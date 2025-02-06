import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeSpecialInterestBillsComponent } from './authorize-special-interest-bills.component';

describe('AuthorizeSpecialInterestBillsComponent', () => {
  let component: AuthorizeSpecialInterestBillsComponent;
  let fixture: ComponentFixture<AuthorizeSpecialInterestBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizeSpecialInterestBillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeSpecialInterestBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
