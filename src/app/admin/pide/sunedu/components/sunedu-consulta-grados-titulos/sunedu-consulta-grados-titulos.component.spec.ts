import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuneduConsultaGradosTitulosComponent } from './sunedu-consulta-grados-titulos.component';

describe('SuneduConsultaGradosTitulosComponent', () => {
  let component: SuneduConsultaGradosTitulosComponent;
  let fixture: ComponentFixture<SuneduConsultaGradosTitulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuneduConsultaGradosTitulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuneduConsultaGradosTitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
