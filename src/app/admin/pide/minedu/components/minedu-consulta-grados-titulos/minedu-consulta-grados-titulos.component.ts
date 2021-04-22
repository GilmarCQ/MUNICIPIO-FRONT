import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TituloGradosMinedu } from 'src/app/core/models/titulos-grados-minedu';
import { MineduService } from 'src/app/core/services/minedu.service';
import { MensajeService } from 'src/app/shared/services/mensaje.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-minedu-consulta-grados-titulos',
  templateUrl: './minedu-consulta-grados-titulos.component.html',
  styleUrls: ['./minedu-consulta-grados-titulos.component.scss']
})
export class MineduConsultaGradosTitulosComponent implements OnInit {

  public form: FormGroup;
  public titulos: TituloGradosMinedu[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private mineduService: MineduService,
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
    this.titulos = [];
    event.preventDefault();
    this.spinner.show();
    this.mineduService.consultaGradosTitulosPorDni( this.nroDocumentoField.value )
      .subscribe(
        data => {
          console.log(data);
          if (data['a:DATA'] !== '') {
            console.log(data['a:DATA']);
            const titulo = <TituloGradosMinedu> data['a:DATA']['a:TituloContract'];
            this.mensaje.showMessageSuccess('Correcto', 'Consulta Realizada Correctamente.');
            this.titulos.push(titulo);
          } else {
            this.mensaje.showMessageWarning('Alerta', 'No se encontraron resultados.');
          }
          this.spinner.hide();
        },
        error => {
          this.mensaje.showMessageError('Error', 'Ha ocurrido un error, vuelva a intentarlo más tarde.');
          this.spinner.hide();
        }
      )
  }
  get nroDocumentoField() {
    return this.form.get('nroDocumento');
  }

}
