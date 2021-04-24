import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroHabitacionComponent } from './registro-habitacion.component';

describe('RegistroHabitacionComponent', () => {
  let component: RegistroHabitacionComponent;
  let fixture: ComponentFixture<RegistroHabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroHabitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
