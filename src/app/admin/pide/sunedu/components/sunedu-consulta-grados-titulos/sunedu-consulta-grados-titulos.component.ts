import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuneduService } from 'src/app/core/services/sunedu.service';
import { MensajeService } from 'src/app/shared/services/mensaje.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-sunedu-consulta-grados-titulos',
  templateUrl: './sunedu-consulta-grados-titulos.component.html',
  styleUrls: ['./sunedu-consulta-grados-titulos.component.scss']
})
export class SuneduConsultaGradosTitulosComponent implements OnInit {

  public form: FormGroup;
  public titulos: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private suneduService: SuneduService,
    private spinner: SpinnerService,
    private mensaje: MensajeService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  public buildForm(): void {
    this.form = this.formBuilder.group({
      nroDocumento: ['', Validators.required]
    });
  }
  public consultar(event: Event): void {
    this.spinner.show();
    this.suneduService.consultaGradosTitulosPorDni(this.nroDocumentoField.value, '')
    .subscribe(
      data => {
        this.titulos = [];
        if (data.listaGTPersona.gtPersona.length === undefined) {
            this.titulos.push(data.listaGTPersona.gtPersona)
        } else {
          this.titulos = data.listaGTPersona.gtPersona;
        }
        this.spinner.hide();
        // console.log(this.titulos)
      },
      error => {
        console.error(error)
        this.spinner.hide();
      }
    )
  }
  get nroDocumentoField() {
    return this.form.get('nroDocumento');
  }

}
