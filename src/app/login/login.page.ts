import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authGuard: AuthGuardService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, longitudValida]],
      password: ['', [Validators.required, validarContrasenna]]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      AuthGuardService.authenticate();
      const username = this.loginForm.get('username')?.value;
      this.router.navigate(['/tabs'], { queryParams: { username }});
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

export const validarContrasenna = (campo: AbstractControl): ValidationErrors | null => {
  const valor = campo.value;
  if (valor && valor.length !== 4) {
    return {contrasennaInvalida: true};
  }

  return null;
}
