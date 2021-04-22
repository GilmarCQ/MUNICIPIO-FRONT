import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReniecService } from 'src/app/core/services/reniec.service';

import { PersonaDni } from 'src/app/core/models/persona-dni.model';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import swal from 'sweetalert2';
import { MensajeService } from 'src/app/shared/services/mensaje.service';

@Component({
  selector: 'app-reniec-consulta',
  templateUrl: './reniec-consulta.component.html',
  styleUrls: ['./reniec-consulta.component.scss']
})
export class ReniecConsultaComponent implements OnInit {

  public form: FormGroup;
  public personaDni: PersonaDni;
  public flagConsulta: boolean;

  constructor(
    private reniecService: ReniecService,
    private formBuilder: FormBuilder,
    private spinner: SpinnerService,
    private mensaje: MensajeService
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  public buildForm(): void {
    this.form = this.formBuilder.group({
      dniConsulta: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    })
  }
  get dniConsultaField() {
    return this.form.get('dniConsulta');
  }

  public consultarDni(): void {
    this.spinner.show();
    console.log(this.dniConsultaField);
    this.reniecService.consultaDni(this.dniConsultaField.value)
      .subscribe(
      //   next: event => console.log(event),
      //   error: error => console.log(error),
      //   complete: () => console.log('Completado')
      // }
        data => {
          if (data.coResultado !== '0000') {
            this.mensaje.showMessageWarning('Alerta', data.deResultado);
          } else {
            this.mensaje.showMessageSuccess('Correcto', data.deResultado);
            this.personaDni = data.datosPersona;
          }
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.mensaje.showMessageError('Error', 'Ha ocurrido un error intentelo más tarde.');
        }
      )
  }

}
