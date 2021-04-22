import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineduMostrarGradosTitulosComponent } from './minedu-mostrar-grados-titulos.component';

describe('MineduMostrarGradosTitulosComponent', () => {
  let component: MineduMostrarGradosTitulosComponent;
  let fixture: ComponentFixture<MineduMostrarGradosTitulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MineduMostrarGradosTitulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MineduMostrarGradosTitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
