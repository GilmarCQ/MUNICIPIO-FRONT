import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import * as parser from 'fast-xml-parser';
var options = {
  attributeNamePrefix: "@_",
  attrNodeName: "attr",
  textNodeName: "#text",
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: "__cdata",
  cdataPositionChar: "\\c",
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  // attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
  // tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ["parse-me-as-string"]
};
@Injectable({
  providedIn: 'root'
})
export class MineduService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Consulta de Grados y Titulos de Egresados de Institutos Tegnológicos y Pedagógicos
   * @param nroDocumento
   */
  public consultaGradosTitulosPorDni(nroDocumento: string): Observable<any> {
    const params = new HttpParams()
      .set('dni', nroDocumento);
    return this.http.get<any>(`${environment.API_URL}/minedu/consulta`, { params })
      .pipe(
        map(response => {
          try {
            const jsonTitulos = parser.parse(response.contenido);
            const consulta = jsonTitulos['GetDataResponse']['GetDataResult'];
            return consulta;
          } catch (error) {
            console.log(error);
            return error;
          }
        })
      );
  }
}
