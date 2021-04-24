import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSensorComponent } from './registro-sensor.component';

describe('RegistroSensorComponent', () => {
  let component: RegistroSensorComponent;
  let fixture: ComponentFixture<RegistroSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroSensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
