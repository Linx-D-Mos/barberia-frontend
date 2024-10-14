import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonIcon, NavController, IonSpinner, IonInputPasswordToggle, IonImg, IonInput, IonButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth/auth.service';
import { arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.page.html',
  styleUrls: ['./cambiar-clave.page.scss'],
  standalone: true,
  imports: [IonIcon, IonSpinner, IonInputPasswordToggle, ReactiveFormsModule, IonImg, IonInput, IonButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CambiarClavePage implements OnInit {
  isVerify: boolean = false;
  cambiarForm!: FormGroup;
  private authService = inject(AuthService);
  pass: any;
  pass_confirm: any;

  constructor(private nav: NavController) {
    addIcons({ arrowBackOutline });
  }

  ngOnInit() {
    this.cambiarForm = new FormGroup({
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
  }

  cambiarClave() {
    this.isVerify = true;
    this.authService.changePasswd(this.cambiarForm.value)
      .then((response) => {
        if (response?.data?.success === 1) {
          this.authService.showToast('Contraseña cambiada correctamente');
          this.authService.navigateByUrl('/auth/login');
          this.isVerify = false;
          this.cambiarForm.reset();
        } else {
          this.isVerify = false;
          this.authService.showToast(response?.data?.message);
        }
      })
      .catch((e) => {
        this.isVerify = false;
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

  goBack() {
    this.nav.back();
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

