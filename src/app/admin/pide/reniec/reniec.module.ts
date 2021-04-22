import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReniecRoutingModule } from './reniec-routing.module';
import { ReniecConsultaComponent } from './components/reniec-consulta/reniec-consulta.component';
import { ReniecCredencialComponent } from './components/reniec-credencial/reniec-credencial.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReniecConsultaComponent,
    ReniecCredencialComponent
  ],
  imports: [
    CommonModule,
    ReniecRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ReniecModule { }
