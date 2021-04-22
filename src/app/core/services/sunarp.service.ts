import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { environment } from 'src/environments/environment';

// import * as parser from 'fast-xml-parser';
import { OficinaSunarp } from '../models/oficina-sunarp.model';
// import { RegistroPartida } from '../models/registro-partida.model';
// var options = {
//   attributeNamePrefix: "@_",
//   attrNodeName: "attr",
//   textNodeName: "#text",
//   ignoreAttributes: true,
//   ignoreNameSpace: false,
//   allowBooleanAttributes: false,
//   parseNodedescripcion: true,
//   parseAttributeValue: false,
//   trimValues: true,
//   cdataTagName: "__cdata",
//   cdataPositionChar: "\\c",
//   parseTrueNumberOnly: false,
//   arrayMode: false, //"strict"
//   // attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
//   // tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
//   stopNodes: ["parse-me-as-string"]
// };

@Injectable({
  providedIn: 'root'
})
export class SunarpService {

  constructor(
    private http: HttpClient,
    private utils: UtilsService
  ) { }

  public getTitularidad(
    tipo: string, apPat: string, apMat: string, nombres: string, razonSocial: string): Observable<any> {
    const params = new HttpParams()
      .set('tipo', tipo.toUpperCase())
      .set('apPat', apPat.toUpperCase())
      .set('apMat', apMat.toUpperCase())
      .set('nombres', nombres.toUpperCase())
      .set('razonSocial', razonSocial.toUpperCase())
      .set('out', 'json');
    return this.http.get<any>(`${environment.API_URL}/sunarp/titularidadPersona`, { params })
      .pipe(
        map(response => {
          var data = response.contenido.buscarTitularidadResponse.respuestaTitularidad;
          var registrosLista = [];
          if (data) {
            if (data.respuestaTitularidad.length === undefined) {
              registrosLista.push(data.respuestaTitularidad);
            } else {
              registrosLista = data.respuestaTitularidad;
            }
          }
          return registrosLista;
        }),
        map(registrosTitular => {
          if (registrosTitular) {
            registrosTitular.forEach(registro => {
              (registro.razonSocial === undefined)
                ? registro.propietario = registro.apPaterno + ' ' + registro.apMaterno + ' ' + registro.nombre
                : registro.propietario = registro.razonSocial;
            });
            return registrosTitular;
          };
        })
      )
  }
  public getOficinas(): Observable<any> {
    const params = new HttpParams()
      .set('out', 'json');
    return this.http.get<any>(`${environment.API_URL}/sunarp/Oficinas`, { params })
      .pipe(
        map(response => {
          return response.contenido.oficina.oficina
        })
      );
  }

  public getOficina(oficinas: OficinaSunarp[], nombreOficina: string): OficinaSunarp | null {
    const oficinaFind = oficinas.find(oficina => oficina.descripcion === nombreOficina);
    if (oficinaFind) {
      return oficinaFind;
    }
    return null;
  }
  public verAsientos(
    zona: string, oficina: string, partida: string, registro: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('zona', zona)
      .set('oficina', oficina)
      .set('partida', partida)
      .set('registro', registro)
      .set('out', 'json');
    return this.http.get<any>(`${environment.API_URL}/sunarp/asientos`, { params })
      .pipe(
        map(response => this.utils.formatearAsientosSunarp(response.contenido.listarAsientosResponse.asientos))
      );
  }
  public verAsiento(
    transaccion: string, idImg: string, tipo: string, nroTotalPag: string, nroPagRef: string, pagina: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('transaccion', transaccion)
      .set('idImg', idImg)
      .set('tipo', tipo)
      .set('totalPag', nroTotalPag)
      .set('pagRef', nroPagRef)
      .set('pagina', pagina)
      .set('out', 'json');
    return this.http.get<any>(`${environment.API_URL}/sunarp/asiento`, { params })
      .pipe(
        map(response => {
          return response.contenido.verAsientoResponse;
          // try {
          //   const jsonPartida = parser.parse(response.contenido, options);
          //   return jsonPartida;
          // } catch (error) {
          //   return error;
          // }
        })
      );
  }
  public getVehiculo(zona: string, oficina: string, placa: string): Observable<any> {
    const params = new HttpParams()
      .set('zona', zona.toUpperCase())
      .set('oficina', oficina.toUpperCase())
      .set('placa', placa.toUpperCase())
      .set('out', 'json');
    return this.http.get<any>(`${environment.API_URL}/sunarp/vehiculo`, {params})
      .pipe(
        map(data => data.contenido.verDetalleRPVResponse.vehiculo)
      );
  }
}
