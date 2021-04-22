import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineduConsultaGradosTitulosComponent } from './minedu-consulta-grados-titulos.component';

describe('MineduConsultaGradosTitulosComponent', () => {
  let component: MineduConsultaGradosTitulosComponent;
  let fixture: ComponentFixture<MineduConsultaGradosTitulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MineduConsultaGradosTitulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MineduConsultaGradosTitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
