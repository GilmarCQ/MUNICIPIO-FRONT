import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReniecConsultaComponent } from './components/reniec-consulta/reniec-consulta.component';
import { ReniecCredencialComponent } from './components/reniec-credencial/reniec-credencial.component';

const routes: Routes = [
  {
    path: 'consulta',
    component: ReniecConsultaComponent
  },
  {
    path: 'credencial',
    component: ReniecCredencialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReniecRoutingModule { }
