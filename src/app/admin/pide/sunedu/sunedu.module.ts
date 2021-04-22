import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuneduRoutingModule } from './sunedu-routing.module';
import { SuneduConsultaGradosTitulosComponent } from './components/sunedu-consulta-grados-titulos/sunedu-consulta-grados-titulos.component';
import { SuneduMostrarGradosTitulosComponent } from './components/sunedu-mostrar-grados-titulos/sunedu-mostrar-grados-titulos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [SuneduConsultaGradosTitulosComponent, SuneduMostrarGradosTitulosComponent],
  imports: [
    CommonModule,
    SuneduRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SuneduModule { }
