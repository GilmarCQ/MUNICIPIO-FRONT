import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SunarpRoutingModule } from './sunarp-routing.module';
import { SunarpTitularidadComponent } from './components/sunarp-titularidad/sunarp-titularidad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SunarpTitularidadContainerComponent } from './components/sunarp-titularidad-container/sunarp-titularidad-container.component';
import { SunarpTitularidadVerAsientosComponent } from './components/sunarp-titularidad-ver-asientos/sunarp-titularidad-ver-asientos.component';
import { SunarpTitularidadVerVehiculoComponent } from './components/sunarp-titularidad-ver-vehiculo/sunarp-titularidad-ver-vehiculo.component';


@NgModule({
  declarations: [
    SunarpTitularidadComponent, SunarpTitularidadContainerComponent, SunarpTitularidadVerAsientosComponent, SunarpTitularidadVerVehiculoComponent],
  imports: [
    CommonModule,
    SunarpRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SunarpModule { }
