import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReliefComponent } from './relief.component';

describe('ReliefComponent', () => {
  let component: ReliefComponent;
  let fixture: ComponentFixture<ReliefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReliefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
