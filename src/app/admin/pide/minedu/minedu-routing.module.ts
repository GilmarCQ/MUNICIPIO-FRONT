import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MineduConsultaGradosTitulosComponent } from './components/minedu-consulta-grados-titulos/minedu-consulta-grados-titulos.component';

const routes: Routes = [
  {
    path: 'consulta-grados',
    component: MineduConsultaGradosTitulosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MineduRoutingModule { }
