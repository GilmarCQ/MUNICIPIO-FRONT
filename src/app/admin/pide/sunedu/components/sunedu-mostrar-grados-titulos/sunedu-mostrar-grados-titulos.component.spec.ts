import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuneduMostrarGradosTitulosComponent } from './sunedu-mostrar-grados-titulos.component';

describe('SuneduMostrarGradosTitulosComponent', () => {
  let component: SuneduMostrarGradosTitulosComponent;
  let fixture: ComponentFixture<SuneduMostrarGradosTitulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuneduMostrarGradosTitulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuneduMostrarGradosTitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
