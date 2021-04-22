import { Injectable } from '@angular/core';
import { SunarpAsiento } from 'src/app/core/models/sunarp-asiento';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    private listadoAsientos: SunarpAsiento[] = [];
    constructor() { }

    /**
     * Método que formatea un entero en un string con la cantidad N digitos,
     * completando con '0' el string
     * @param numero
     * @param digitos
     */
    formatearCaracteres(cadena: string, digitos: number, caracter: string): string {
        var texto = cadena;
        // console.log('Cadena', cadena);
        // console.log('Digitos', digitos);
        // console.log('Caracter', caracter);
        // console.log('# DIgitos Cadena', cadena.toString.length);
        for (let index = cadena.toString().length; index < digitos; index++) {
            texto = caracter + texto;
        }
        // console.log(texto);
        return texto;
    }
    formatearAsientosSunarp(lista: any): SunarpAsiento[] {
        console.log(lista);
        this.listadoAsientos = [];
        if (lista.nroTotalPag) {
            if (lista.listFichas) {
                if (lista.listFichas.numPag > 1) {
                    for (let a = 0; a < lista.listFichas.listPag.length; a++) {
                        this.agregarAsiento(
                            lista.listFichas.idImgFicha.toString(), lista.listFichas.listPag[a].nroPagRef,
                            lista.listFichas.listPag[a].pagina, lista.listFichas.tipo, lista.nroTotalPag, lista.transaccion);
                    }
                } else {
                    this.agregarAsiento(
                        lista.listFichas.idImgFicha.toString(), lista.listFichas.listPag.nroPagRef,
                        lista.listFichas.listPag.pagina, lista.listFichas.tipo, lista.nroTotalPag, lista.transaccion);
                }
            }
            const asientos = lista.listAsientos;
            if (asientos) {
                if (asientos.length) {
                    for (let index = 0; index < asientos.length; index++) {
                        if (asientos[index].listPag.length) {
                            for (let pagina = 0; pagina < asientos[index].listPag.length; pagina++) {
                                this.agregarAsiento(
                                    asientos[index].idImgAsiento.toString(), asientos[index].listPag[pagina].nroPagRef,
                                    asientos[index].listPag[pagina].pagina, asientos[index].tipo, lista.nroTotalPag, lista.transaccion);
                            }
                        } else {
                            this.agregarAsiento(
                                asientos[index].idImgAsiento.toString(), asientos[index].listPag.nroPagRef,
                                asientos[index].listPag.pagina, asientos[index].tipo, lista.nroTotalPag, lista.transaccion);
                        }
                    }
                } else {
                    for (let a = 0; a < asientos.listPag.length; a++) {
                        this.agregarAsiento(
                            asientos.idImgAsiento.toString(), asientos.listPag[a].nroPagRef,
                            asientos.listPag[a].pagina, asientos.tipo, lista.nroTotalPag, lista.transaccion);
                    }
                }
            }
        }
        return this.listadoAsientos;
    }
    private agregarAsiento(idImg: string, nroPagRef: string, pagina: string, tipo: string, nroTotalPag: string, transaccion: string): void {
        const asiento: SunarpAsiento = {
            idImg, nroPagRef, pagina, tipo, nroTotalPag, transaccion
        };
        this.listadoAsientos.push(asiento);
    }
}
