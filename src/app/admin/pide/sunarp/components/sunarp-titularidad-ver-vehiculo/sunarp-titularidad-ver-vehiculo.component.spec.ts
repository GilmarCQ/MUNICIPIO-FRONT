import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunarpTitularidadVerVehiculoComponent } from './sunarp-titularidad-ver-vehiculo.component';

describe('SunarpTitularidadVerVehiculoComponent', () => {
  let component: SunarpTitularidadVerVehiculoComponent;
  let fixture: ComponentFixture<SunarpTitularidadVerVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SunarpTitularidadVerVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SunarpTitularidadVerVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
