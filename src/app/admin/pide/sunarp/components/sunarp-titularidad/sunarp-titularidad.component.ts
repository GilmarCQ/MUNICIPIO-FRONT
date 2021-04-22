import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OficinaSunarp } from 'src/app/core/models/oficina-sunarp.model';
import { TipoBusqueda } from 'src/app/core/models/tipo-busqueda.model';
import { ReniecService } from 'src/app/core/services/reniec.service';
import { SunarpService } from 'src/app/core/services/sunarp.service';
import { MensajeService } from 'src/app/shared/services/mensaje.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { PersonaDni } from 'src/app/core/models/persona-dni.model';
import { RegistroPartida } from 'src/app/core/models/registro-partida.model';


@Component({
  selector: 'app-sunarp-titularidad',
  templateUrl: './sunarp-titularidad.component.html',
  styleUrls: ['./sunarp-titularidad.component.scss']
})
export class SunarpTitularidadComponent implements OnInit, AfterContentChecked {
  public nombreTitularDni: string;
  public formTipoBusqueda: FormGroup;
  public formTitular: FormGroup;
  public formPartida: FormGroup;
  public tipoBusquedaSunarp: TipoBusqueda[] = [
    { id: 1, nombre: 'Persona Natural' },
    { id: 2, nombre: 'Persona Jurídica' },
    { id: 3, nombre: 'Partida' }
  ]
  public tipoBusquedaTitular: TipoBusqueda[];
  public tipoBusquedaRegistro: TipoBusqueda[] = [
    { id: 1, nombre: 'Registro de Propiedad Inmueble', valor: '21000' },
    { id: 2, nombre: 'Registro de Personas Jurídicas', valor: '22000' },
    { id: 3, nombre: 'Registro de Personas Naturales', valor: '23000' }
  ]
  public oficinas: OficinaSunarp[] = [];
  public registrosPartidas: RegistroPartida[] = [];
  private personaDni: PersonaDni;

  constructor(
    private formBuilder: FormBuilder,
    private sunarpService: SunarpService,
    private reniecService: ReniecService,
    private spinner: SpinnerService,
    private mensaje: MensajeService,
    private utils: UtilsService,
    private cdRef: ChangeDetectorRef
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.listarOficinas();
    this.seleccionarTipoBusqueda();
    this.seleccionarTipoTitular();
  }
  ngAfterContentChecked(): void {
    this.cdRef.detectChanges()
  }

  public buildForm(): void {
    this.formTipoBusqueda = this.formBuilder.group({
      tipoBusqueda: ['', Validators.required],
      tipoBusquedaTitular: ['']
    });
    this.formPartida = this.formBuilder.group({
      registro: ['', Validators.required],
      oficina: ['', Validators.required],
      partida: ['', Validators.required]
    });
    this.formTitular = this.formBuilder.group({
      nroDocumento: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      nombres: [''],
      razonSocial: ['']
    })

  }
  public removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }
  public seleccionarTipoBusqueda(): void {
    this.tipoBusquedaField.valueChanges
      .subscribe(
        valor => {
          this.nombreTitularDni = null;
          this.tipoBusquedaTitularField.setValue(null);
          this.formTipoBusqueda.setValidators(null);
          switch (valor.id) {
            case 1:
              this.tipoBusquedaTitular = [{ id: 1, nombre: 'DNI' }, { id: 2, nombre: 'Nombres y Apelldos' }];
              break;
            case 2:
              this.tipoBusquedaTitular = [{ id: 1, nombre: 'Razón Social' }];
              break;
          }
        }
      )
  }
  public seleccionarTipoTitular(): void {
    this.tipoBusquedaTitularField.valueChanges
      .subscribe(valor => {
        if (valor) {
          this.nombreTitularDni = null;
          this.removeValidators(this.formTitular);
          this.formTitular.reset();
          switch (valor.id) {
            case 1:
              //  DNI
              if (this.tipoBusquedaField.value.id === 1) {
                this.nroDocumentoField.setValidators([Validators.required]);
              }
              //  Razon Social
              if (this.tipoBusquedaField.value.id === 2) {
                this.razonSocialField.setValidators([Validators.required]);
              }
              break;
            case 2:
              //  Nombres y Apellidos
              if (valor.id === 2) {
                this.apellidoPaternoField.setValidators([Validators.required]);
                this.apellidoMaternoField.setValidators([Validators.required]);
                this.nombresField.setValidators([Validators.required]);
              }
              break;
          }
        }
      })
  }
  public listarOficinas(): void {
    this.spinner.show();
    this.sunarpService.getOficinas()
      .subscribe(
        data => {
          this.oficinas = data;
          this.oficinas = this.oficinas.sort((a, b) => {
            if (a.descripcion > b.descripcion) return 1;
            if (a.descripcion < b.descripcion) return -1;
            return 0;
          });
          this.spinner.hide();
        },
        error => {
          this.mensaje.showMessageError('Error', 'Ha ocurrido un error intentelo más tarde.');
          this.spinner.hide();
        }
      );
  }
  public listarAsientos(): void {
    this.spinner.show();
    this.sunarpService.verAsientos(
      this.utils.formatearCaracteres(this.oficinaField.value.codZona, 2, '0'),
      this.utils.formatearCaracteres(this.oficinaField.value.codOficina, 2, '0'),
      this.partidaField.value,
      this.registroField.value
    )
      .subscribe(
        data => {
          if (data.transaccion === 0) {
            this.mensaje.showMessageWarning('Advertencia', 'No se tienen registros para la partida.')
          } else {
            console.log(data);
            this.mensaje.showMessageSuccess('Correcto', 'Consulta realizada con exito.');
          }
          this.spinner.hide();
        },
        error => {
          console.error(error);
          this.spinner.hide();
          this.mensaje.showMessageError('Error', 'Ha ocurrido un error intentelo más tarde.')
        }
      )
  }
  public buscarPartidas(): void {
    switch (this.tipoBusquedaField.value.id) {
      //  Busqueda por Persona Natural
      case 1:
        switch (this.tipoBusquedaTitularField.value.id) {
          //  Busqueda por DNI
          case 1:
            this.buscarTitularidadDni();
            break;
          //  Busqueda por Nombres y Apellidos
          case 2:
            this.buscarTitularidadNombresApellidos();
            break;
        }
        break;
      //  Busqueda por Persona Juridica
      case 2:
        this.buscarTitularidadRazonSocial();
        break;
      //  Búsqueda de Partida
      case 3:
        this.listarAsientos();
        break;
    }
  }
  public buscarTitularidadDni(): void {
    this.spinner.show();
    this.reniecService.consultaDni(this.nroDocumentoField.value)
      .subscribe(persona => {
        if (persona.coResultado !== '0000') {
          this.mensaje.showMessageWarning('Alerta', persona.deResultado);
        } else {
          this.personaDni = persona.datosPersona;
          this.nombreTitularDni =
            `${this.personaDni.apPrimer} ` +
            `${(this.personaDni.apSegundo === undefined) ? '' : this.personaDni.apSegundo} ${this.personaDni.prenombres} ` +
            ` - ${this.personaDni.estadoCivil}`;
          this.buscarTitularidad(
            'N', this.personaDni.apPrimer,
            (this.personaDni.apSegundo === undefined) ? '' : this.personaDni.apSegundo,
            this.personaDni.prenombres, '');
        }
      },
        error => {
          this.spinner.hide();
          this.mensaje.showMessageError('Error', 'Ha ocurrido un error intentelo más tarde.');
        }
      )
  }
  public buscarTitularidadNombresApellidos(): void {
    this.spinner.show();
    this.buscarTitularidad(
      'N', this.apellidoPaternoField.value, this.apellidoMaternoField.value, this.nombresField.value, ''
    );
  }
  public buscarTitularidadRazonSocial(): void {
    this.spinner.show();
    this.buscarTitularidad(
      'J', '', '', '', this.razonSocialField.value
    );
  }
  private buscarTitularidad(
    tipo: string, apPaterno: string, apMaterno: string, nombres: string, razonSocial: string): void {
    this.sunarpService.getTitularidad(tipo, apPaterno, apMaterno, nombres, razonSocial)
      .subscribe(
        data => {
          if (data.length) {
            this.registrosPartidas = data;
            console.log(this.registrosPartidas);
            this.spinner.hide();
            this.mensaje.showMessageSuccess('Correcto', 'La busqueda se realizo correctamente.');
          } else {
            this.registrosPartidas = [];
            this.spinner.hide();
            this.mensaje.showMessageWarning('Alerta', 'La persona no tiene registrada partidas.');
          }
        },
        error => {
          this.registrosPartidas = [];
          this.spinner.hide();
          this.mensaje.showMessageError('Error', 'Ha ocurrido un error intentelo más tarde.');
          console.error(error)
        }
      )
  }

  get tipoBusquedaField() { return this.formTipoBusqueda.get('tipoBusqueda'); }
  get tipoBusquedaTitularField() { return this.formTipoBusqueda.get('tipoBusquedaTitular'); }
  get registroField() { return this.formPartida.get('registro'); }
  get oficinaField() { return this.formPartida.get('oficina'); }
  get partidaField() { return this.formPartida.get('partida'); }
  get nroDocumentoField() { return this.formTitular.get('nroDocumento'); }
  get apellidoPaternoField() { return this.formTitular.get('apellidoPaterno'); }
  get apellidoMaternoField() { return this.formTitular.get('apellidoMaterno'); }
  get nombresField() { return this.formTitular.get('nombres'); }
  get razonSocialField() { return this.formTitular.get('razonSocial'); }
}
