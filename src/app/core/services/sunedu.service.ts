import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuneduService {

  private usuarioSunedu: string = 'ONGEI';
  private claveSunedu: string = 'ONGEI';
  private idEntidadSunedu: string = '1';
  constructor(
    private http: HttpClient) { }

  public consultaGradosTitulosPorDni(
    nroDocumento: string, tipDocumento): Observable<any> {
    const fecha = new Date();
    const params = new HttpParams()
      .set('usuario', this.usuarioSunedu)
      .set('clave', this.claveSunedu)
      .set('idEntidad', this.idEntidadSunedu)
      .set('fecha', fecha.getFullYear().toString()+fecha.getMonth().toString()+fecha.getDay().toString())
      .set('hora', fecha.getHours().toString()+fecha.getMinutes().toString()+fecha.getSeconds().toString())
      .set('mac_wsServer', 'AF:06:EE:46:DA:EC')
      .set('ip_wsServer', '209.45.76.37')
      .set('ip_wsUser', '192.168.1.3')
      .set('tipDocIdentidad', tipDocumento)
      .set('nroDocIdentidad', nroDocumento)
      .set('out', 'json');
    return this.http.get<any>(`${environment.API_URL}/sunedu/grados`, { params })
      .pipe(
        map(response => {
          return response.contenido.opConsultarRNGTResponse
        })
      );
  }
}
