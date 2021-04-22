import { Component, Input, OnInit } from '@angular/core';
import { TituloGradosMinedu } from 'src/app/core/models/titulos-grados-minedu';

@Component({
  selector: 'app-minedu-mostrar-grados-titulos',
  templateUrl: './minedu-mostrar-grados-titulos.component.html',
  styleUrls: ['./minedu-mostrar-grados-titulos.component.scss']
})
export class MineduMostrarGradosTitulosComponent implements OnInit {

  @Input() titulos: TituloGradosMinedu[];

  constructor() { 
  }

  ngOnInit(): void {
  }

}
