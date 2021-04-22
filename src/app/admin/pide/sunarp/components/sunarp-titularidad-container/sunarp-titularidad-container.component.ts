import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OficinaSunarp } from 'src/app/core/models/oficina-sunarp.model';
import { RegistroPartida } from 'src/app/core/models/registro-partida.model';
import { SunarpAsiento } from 'src/app/core/models/sunarp-asiento';
import { TipoBusqueda } from 'src/app/core/models/tipo-busqueda.model';
import { VehiculoSunarp } from 'src/app/core/models/vehiculo-sunarp.model';
import { SunarpService } from 'src/app/core/services/sunarp.service';
import { MensajeService } from 'src/app/shared/services/mensaje.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { SunarpTitularidadVerAsientosComponent } from '../sunarp-titularidad-ver-asientos/sunarp-titularidad-ver-asientos.component';
import { SunarpTitularidadVerVehiculoComponent } from '../sunarp-titularidad-ver-vehiculo/sunarp-titularidad-ver-vehiculo.component';

@Component({
  selector: 'app-sunarp-titularidad-container',
  templateUrl: './sunarp-titularidad-container.component.html',
  styleUrls: ['./sunarp-titularidad-container.component.scss']
})
export class SunarpTitularidadContainerComponent implements AfterViewInit, OnInit {

  @Input() registrosPartidas: RegistroPartida[];
  @Input() oficinas: OficinaSunarp[];
  @Input() tipoBusquedaRegistro: TipoBusqueda[];
  public labelDisplayed: string[] =
    ['propietario', 'direccion', 'partida', 'estado', 'libro', 'oficina', 'registro', 'zona', 'acciones'];
  public dataSource: MatTableDataSource<RegistroPartida>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private sunarpService: SunarpService,
    private mensaje: MensajeService,
    private spinner: SpinnerService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.registrosPartidas);
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  public listarAsientos(registro: RegistroPartida): void {
    if (registro.numeroPlaca) {
      this.verVehiculo(registro)
    } else {
      this.verPartidas(registro)
    }
  }
  public verVehiculo(registro: RegistroPartida): void {
    console.log(registro);
    this.spinner.show();
    const oficina: OficinaSunarp = this.sunarpService.getOficina(this.oficinas, registro.oficina);
    this.sunarpService.getVehiculo(oficina.codZona, oficina.codOficina, registro.numeroPlaca)
      .subscribe(
        (data: VehiculoSunarp) => {
          console.log(data);
          if (data.placa) {
            this.dialog.open(SunarpTitularidadVerVehiculoComponent, {
              width: '600px',
              data: {
                vehiculo: data
              }
            })
          } else {
            this.mensaje.showMessageError('Error', 'Ha ocurrido un error intentelo más tarde.');
          }
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }
  public verPartidas(registro: RegistroPartida): void {
    this.spinner.show();
    let oficina = this.oficinas[this.oficinas.findIndex(oficina => oficina.descripcion === registro.oficina)];
    let tipoRegistro = this.tipoBusquedaRegistro[this.tipoBusquedaRegistro.findIndex(tipoRegistro => tipoRegistro.nombre.toUpperCase() === registro.registro)];
    this.sunarpService.verAsientos( oficina.codZona, oficina.codOficina, registro.numeroPartida.toString(), tipoRegistro.valor)
      .subscribe(
        (data: SunarpAsiento[]) => {
          if (data.length === 0) {
            this.mensaje.showMessageWarning('Advertencia', 'No se tienen asientos digitalizados para la partida.')
          } else {
            console.log(data);
            this.dialog.open(SunarpTitularidadVerAsientosComponent, {
              width: '600px',
              data: {
                asientos: data
              }
            });
            // this.mensaje.showMessageSuccess('Correcto', 'Consulta realizada con exito.');
          }
          this.spinner.hide();
        },
        error => {
          console.error(error);
          this.spinner.hide();
          this.mensaje.showMessageError('Error', 'Ha ocurrido un error intentelo más tarde.')
        }
      );
  }

}
