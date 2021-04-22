import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunarpTitularidadVerAsientosComponent } from './sunarp-titularidad-ver-asientos.component';

describe('SunarpTitularidadVerAsientosComponent', () => {
  let component: SunarpTitularidadVerAsientosComponent;
  let fixture: ComponentFixture<SunarpTitularidadVerAsientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SunarpTitularidadVerAsientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SunarpTitularidadVerAsientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
