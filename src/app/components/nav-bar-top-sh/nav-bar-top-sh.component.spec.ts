import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarTopShComponent } from './nav-bar-top-sh.component';

describe('NavBarTopShComponent', () => {
  let component: NavBarTopShComponent;
  let fixture: ComponentFixture<NavBarTopShComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarTopShComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarTopShComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
