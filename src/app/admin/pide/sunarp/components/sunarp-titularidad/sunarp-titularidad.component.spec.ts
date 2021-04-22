import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunarpTitularidadComponent } from './sunarp-titularidad.component';

describe('SunarpTitularidadComponent', () => {
  let component: SunarpTitularidadComponent;
  let fixture: ComponentFixture<SunarpTitularidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SunarpTitularidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SunarpTitularidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
