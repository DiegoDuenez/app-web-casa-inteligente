import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCasaComponent } from './mi-casa.component';

describe('MiCasaComponent', () => {
  let component: MiCasaComponent;
  let fixture: ComponentFixture<MiCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiCasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
