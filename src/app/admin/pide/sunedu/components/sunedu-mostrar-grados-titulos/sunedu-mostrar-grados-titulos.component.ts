import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sunedu-mostrar-grados-titulos',
  templateUrl: './sunedu-mostrar-grados-titulos.component.html',
  styleUrls: ['./sunedu-mostrar-grados-titulos.component.scss']
})
export class SuneduMostrarGradosTitulosComponent implements OnInit {

  @Input() titulos: any;
  constructor() { }

  ngOnInit(): void {
  }

}
