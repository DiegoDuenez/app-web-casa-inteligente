import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroAyudaComponent } from './centro-ayuda.component';

describe('CentroAyudaComponent', () => {
  let component: CentroAyudaComponent;
  let fixture: ComponentFixture<CentroAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroAyudaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
