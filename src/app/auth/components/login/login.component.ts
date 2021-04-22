import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }
  public buildForm(): void {
    this.form = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  public iniciarSesion(event: Event): void{
    event.preventDefault();
    console.log('123465');
    console.log(this.form);
    if ( this.form.valid ) {
      console.log('Login');
      this.router.navigate(['/admin']);
    } else {
      this.form.markAllAsTouched;
    }
  }

  public limpiarFormulario(): void {
    console.log('Limpiar Formulario');
  }

}
