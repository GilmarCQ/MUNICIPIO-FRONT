import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReniecService } from 'src/app/core/services/reniec.service';
import { MensajeService } from 'src/app/shared/services/mensaje.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-reniec-credencial',
  templateUrl: './reniec-credencial.component.html',
  styleUrls: ['./reniec-credencial.component.scss']
})
export class ReniecCredencialComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reniecService: ReniecService,
    private mensaje: MensajeService,
    private spinner: SpinnerService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  public buildForm(): void {
    this.form = this.formBuilder.group({
      credencialAnterior: ['', [Validators.required]],
      credencialNueva: ['', [Validators.required]],
      nuDni: ['', [Validators.required]]
    });
  }
  public actualizarCredencial(): void {
    this.spinner.show();
    this.reniecService.actualizarCredencial(this.credencialAnterior.value, this.credencialNueva.value, this.nuDni.value)
      .subscribe(
        data => {
          this.spinner.hide();
          console.log(data);
          if ( data.coResultado === '0000' ) {
            this.mensaje.showMessageSuccess('Correcto', data.deResultado);
          } else {
            this.mensaje.showMessageWarning('Advertencia', data.deResultado);
          }
        },
        error => {
          console.error(error);
          this.mensaje.showMessageError('Error', 'Ha ocurrido un error intentelo más tarde.');
          this.spinner.hide();
        }
      )
  }
  get credencialAnterior() { return this.form.get('credencialAnterior'); }
  get credencialNueva() { return this.form.get('credencialNueva'); }
  get nuDni() { return this.form.get('nuDni'); }

}
