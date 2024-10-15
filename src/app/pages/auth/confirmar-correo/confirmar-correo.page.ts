import { Component, OnInit, ViewChildren, QueryList, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonNote, IonText, IonGrid, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { CapacitorHttp } from '@capacitor/core';
import { AuthService } from '../../../services/auth/auth.service';
import { VerifyEmailService } from '../../../services/verify/verify-email.service';
import { DataService } from 'src/app/services/data/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmar-correo',
  templateUrl: './confirmar-correo.page.html',
  styleUrls: ['./confirmar-correo.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputOtpModule, IonButton, IonText, IonNote, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ConfirmarCorreoPage implements OnInit {

  #authService = inject(VerifyEmailService);
  private authService = inject(AuthService);
  emailShared: string | null = null;
  isVerify: boolean = false;
  pass: any;
  verifyForm!: FormGroup;
  email: any;
  contexto: string = '';
  isExist: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.emailShared = this.authService.getEmail(); // Obtiene el valor del correo
    this.verifyForm = new FormGroup({
      email: new FormControl(this.emailShared, [Validators.required, Validators.email]),
      code: new FormControl('', [Validators.required]),
    });
    this.route.params.subscribe(params => {
      this.contexto = params['contexto']; // Obtiene el parámetro contexto
      console.log('Valor de contexto:', this.contexto);
      // Aquí puedes llamar a getEmail() si es necesario
      this.getEmail();
    });
    console.log('Email desde otra página:', this.emailShared); // Muestra el valor del correo en la consola
  }

  getEmail() {
    if (this.contexto === 'registrar') {
      this.email = this.authService.getEmail(); // Obtiene el email almacenado en el servicio
    } else if (this.contexto === 'recuperar') {
      this.email = this.authService.getEmail(); // Obtiene el email almacenado en el servicio
    }
  }

  verificarCodigo() {
    if (this.contexto == 'registrar') {
      this.isVerify = true;
      this.#authService.verifyEmail(this.verifyForm.value)
        .then((response) => {
          if (response?.data?.success === 1) {
            console.log("Verificación exitosa");
            this.authService.navigateByUrl('/auth/login');
            this.isVerify = false;
            this.verifyForm.reset();
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
    if (this.contexto == 'recuperar') {
      this.isExist = true;
      const formValue = this.verifyForm.value;
      formValue.reset_password_code = formValue.code;
      this.authService.verifyCodeChangePasswd(formValue)
        .then((response) => {
          if (response?.data?.success === 1) {
            console.log('Código verificado');
            this.authService.navigateByUrl('/auth/cambiar-clave');
            this.isExist = false;
            this.verifyForm.reset();
          } else {
            this.isExist = false;
            this.authService.showAlert(response?.data?.message);
          }
        })
        .catch(e => {
          console.log(e);
          this.isExist = false;
          this.authService.showAlert(e?.error?.message);
        });
    }
  }

  resendCode() {
    console.log('Reenviar código');
    // Aquí puedes agregar la lógica para reenviar el código
  }
}
