import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SunarpTitularidadComponent } from './components/sunarp-titularidad/sunarp-titularidad.component';

const routes: Routes = [
  {
    path: 'titularidad',
    component: SunarpTitularidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SunarpRoutingModule { }
