import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReniecService {
  private ruc = '20173809663';
  private password = '72690553';
  private dniUsuario = '72690553';
  constructor(
    private http: HttpClient
  ) { }

  public consultaDni(dniConsulta: string): Observable<any> {
    const params = new HttpParams()
      .set('dniConsulta', dniConsulta)
      .set('dniUsuario', this.dniUsuario)
      .set('ruc', this.ruc)
      .set('password', this.password)
      .set('out', 'json');
    return this.http.get<any>(`${environment.API_URL}/reniec/consulta`, { params })
      .pipe(
        map(response => {
          console.log(response.contenido.consultarResponse.return);
          return response.contenido.consultarResponse.return;
        })
      );
  }

  public actualizarCredencial(credencialAnterior: string, credencialNueva: string, nuDni: string): Observable<any> {
    const params = new HttpParams()
      .set('credencialAnterior', credencialAnterior)
      .set('credencialNueva', credencialNueva)
      .set('nuDni', nuDni)
      .set('nuRuc', environment.RUC_ENTIDAD)
      .set('out', 'json');
    return this.http.get<any>(`${environment.API_URL}/reniec/actualizarCredencial`, { params })
      .pipe(
        map(response => {
          return response.contenido.actualizarcredencialResponse.return;
        })
      );
  }
}
