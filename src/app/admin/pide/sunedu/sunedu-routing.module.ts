import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuneduConsultaGradosTitulosComponent } from './components/sunedu-consulta-grados-titulos/sunedu-consulta-grados-titulos.component';

const routes: Routes = [
  {
    path: 'consulta-grados',
    component: SuneduConsultaGradosTitulosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuneduRoutingModule { }
