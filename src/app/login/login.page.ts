import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, longitudValida]],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario enviado', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

export const longitudValida = (campo: AbstractControl): ValidationErrors | null => {
  const valor = campo.value;
  if (valor && (valor.length < 3 || valor.length > 8)) {
    return {longitudInvalida: true};
  }

  return null;


}
