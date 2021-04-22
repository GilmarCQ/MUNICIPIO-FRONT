import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MineduRoutingModule } from './minedu-routing.module';
import { MineduConsultaGradosTitulosComponent } from './components/minedu-consulta-grados-titulos/minedu-consulta-grados-titulos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MineduMostrarGradosTitulosComponent } from './components/minedu-mostrar-grados-titulos/minedu-mostrar-grados-titulos.component';


@NgModule({
  declarations: [
    MineduConsultaGradosTitulosComponent,
    MineduMostrarGradosTitulosComponent
  ],
  imports: [
    CommonModule,
    MineduRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class MineduModule { }
