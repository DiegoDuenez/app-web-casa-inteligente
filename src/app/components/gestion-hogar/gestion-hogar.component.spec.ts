import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHogarComponent } from './gestion-hogar.component';

describe('GestionHogarComponent', () => {
  let component: GestionHogarComponent;
  let fixture: ComponentFixture<GestionHogarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionHogarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionHogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
