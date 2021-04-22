import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import { SunarpAsiento } from 'src/app/core/models/sunarp-asiento';
import { SunarpService } from 'src/app/core/services/sunarp.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

import * as bootstrap from 'bootstrap';

// import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-sunarp-titularidad-ver-asientos',
  templateUrl: './sunarp-titularidad-ver-asientos.component.html',
  styleUrls: ['./sunarp-titularidad-ver-asientos.component.scss']
})
export class SunarpTitularidadVerAsientosComponent implements OnInit, AfterViewInit {

  public labelTable: string[] = ['tipo', 'numeroPagina', 'idImagen', 'acciones'];
  public dataSource: MatTableDataSource<SunarpAsiento>;
  public imagenAsiento: string = '';
  public asientos: SunarpAsiento[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('#asientoModal') modal: ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sunarpService: SunarpService,
    private spinner: SpinnerService
  ) {
    this.asientos = data.asientos;
    this.dataSource = new MatTableDataSource(this.asientos);
    // console.log(this.data.asientos);
  }

  ngOnInit(): void {
    // console.log(this.data.asientos);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // console.log(this.data.asientos);
  }

  public imprimirAsiento(asiento: SunarpAsiento): void {
    console.log(asiento)
    this.spinner.show();
    this.sunarpService.verAsiento(
      asiento.transaccion, asiento.idImg, asiento.tipo, asiento.nroTotalPag, asiento.nroPagRef, asiento.pagina)
      .subscribe(
        data => {
          console.log(data)
          const doc = new jsPDF({
            orientation: 'l',
          });
          const imagen = 'data:image/jpeg;base64,' + data.img;
          const width = doc.internal.pageSize.getWidth();
          const height = doc.internal.pageSize.getHeight();
          doc.addImage(imagen, 'JPEG', 0, 0, width, height);
          doc.save(`${asiento.tipo}-${asiento.transaccion}-${asiento.idImg}.pdf`);
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          console.error(error)
        }
      )
  }
  public mostrarAsiento(asiento: SunarpAsiento): void {
    console.log(asiento)
    this.spinner.show();
    this.sunarpService.verAsiento(
      asiento.transaccion, asiento.idImg, asiento.tipo, asiento.nroTotalPag, asiento.nroPagRef, asiento.pagina)
      .subscribe(
        data => {
          this.imagenAsiento = 'data:image/jpeg;base64,' + data.img;
          var newTab = window.open();
          newTab.document.body.innerHTML = `<img src="${this.imagenAsiento}" width="auto" height="auto">`;
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          console.error(error)
        }
      )
  }


}
