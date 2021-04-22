import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sunarp-titularidad-ver-vehiculo',
  templateUrl: './sunarp-titularidad-ver-vehiculo.component.html',
  styleUrls: ['./sunarp-titularidad-ver-vehiculo.component.scss']
})
export class SunarpTitularidadVerVehiculoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }
}
