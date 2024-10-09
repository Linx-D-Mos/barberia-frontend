import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { IonicModule } from '@ionic/angular'; // Importa solo IonicModule aquí
import { AuthService } from '../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    InputOtpModule,
    IonicModule, // Solo necesitas IonicModule para los componentes de Ionic
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegistroPage implements OnInit {
  /* *************************************** INYECCIONES *************************************** */

  /**
   * Servicio de autenticación inyectado.
   *
   * @private
   * @type {AuthService}
   */
  private authService = inject(AuthService);

  /* ********************************** FIN DE LAS INYECCIONES ********************************** */

  /* **************************************** VARIABLES **************************************** */

  /**
   * Variable para almacenar el formulario de registro
   */
  regisForm!: FormGroup;

  /**
   * Variable para almacenar la contraseña
   */
  pass: any;

  /**
   * Variable para almacenar la confirmación de la contraseña
   */
  pass_confirm: any;

  /**
   * Variable para saber si se está registrando
   */
  isRegister = false;

  /* ************************************* FIN DE VARIABLES ************************************* */

  constructor() {
    addIcons({ arrowBack });
  }

  ngOnInit() {
    this.regisForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        createPasswordStrengthValidator(),
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        passwordMatchValidator('password'),
      ]),
    });
    // this.getEmail();
  }

  registrar() {
    this.isRegister = true;

    this.authService
      .register(this.regisForm.value)
      .then((response) => {
        if (response?.data?.success === 1) {
          this.authService.navigateByUrl('/confirmar-correo');
          this.isRegister = false;
          this.regisForm.reset();
        } else {
          this.isRegister = false;
          this.authService.showToast(response?.data?.message);
        }
      })
      .catch((e) => {
        this.isRegister = false;
        this.authService.showToast(e?.error?.message);
      });
  }

  /**
   * Función para obtener el valor del input de la contraseña
   * @param ev
   */
  onInput(ev: any) {
    this.pass = ev.target!.value;
  }

  /**
   * Función para obtener el valor del input de la confirmación de la contraseña
   * @param ev
   */
  onInputConfirm(ev: any) {
    this.pass_confirm = ev.target!.value;
  }
}

/**
 * Validador personalizado para verificar si el valor de un control coincide con el valor de otro control.
 *
 * @param matchTo - El nombre del control con el que se debe comparar el valor.
 * @returns Una función de validador que devuelve un objeto de errores de validación si los valores no coinciden, o null si coinciden.
 */
export function passwordMatchValidator(matchTo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get(matchTo);

    if (password && control.value !== password.value) {
      return { passwordMismatch: true };
    }

    return null;
  };
}

/**
 * Crea un validador de fuerza de contraseña.
 *
 * Este validador verifica si una contraseña cumple con los siguientes criterios:
 * - Contiene al menos una letra mayúscula.
 * - Contiene al menos una letra minúscula.
 * - Contiene al menos un número.
 * - Contiene al menos un carácter especial.
 *
 * @returns {ValidatorFn} Una función de validador que toma un control y devuelve un objeto de errores de validación o null.
 */
export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    const passwordValid =
      hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return !passwordValid ? { passwordStrength: true } : null;
  };
}
