import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'reniec',
    loadChildren: () => import('./reniec/reniec.module').then(m => m.ReniecModule)
  },
  {
    path: 'minedu',
    loadChildren: () => import('./minedu/minedu.module').then(m => m.MineduModule)
  },
  {
    path: 'sunedu',
    loadChildren: () => import('./sunedu/sunedu.module').then(m => m.SuneduModule)
  },
  {
    path: 'sunarp',
    loadChildren: () => import('./sunarp/sunarp.module').then(m => m.SunarpModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PideRoutingModule { }
