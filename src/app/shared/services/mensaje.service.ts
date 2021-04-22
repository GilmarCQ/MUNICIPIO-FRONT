import { Injectable } from '@angular/core';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor() { }

  showMessageWarning(titulo: string, mensaje: string) {
    swal.fire({
      icon: 'warning',
      title: titulo,
      text: mensaje
    })
  }
  showMessageSuccess(titulo: string, mensaje: string) {
    swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje
    })
  }
  showMessageError(titulo: string, mensaje: string) {
    swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje
    })
  }
}
