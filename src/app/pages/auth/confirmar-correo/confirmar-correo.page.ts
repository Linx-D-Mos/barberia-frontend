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

@Component({
  selector: 'app-confirmar-correo',
  templateUrl: './confirmar-correo.page.html',
  styleUrls: ['./confirmar-correo.page.scss'],
  standalone: true,
  imports: [ ReactiveFormsModule ,ButtonModule, InputOtpModule, IonButton, IonText, IonNote, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ConfirmarCorreoPage implements OnInit {

  #authService = inject(VerifyEmailService);
  private authService = inject(AuthService);
  verifyForm!: FormGroup;
  email: any;
  // otpValue: string = '';  // Variable para almacenar el valor del OTP
  // nada = {
  //   code: this.otpValue
  // }
  isVerify: boolean = false;

  ngOnInit() {
    this.getEmail();
    this.verifyForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
    });
  }

  getEmail() {
    this.authService.perfil()
      .then((response) => {
        if (response?.data?.success === 1) {
          this.email = response.data;
        } else {
          this.authService.showAlert(
            'Su token de acceso ya no es valido, por favor inicie sesión nuevamente.'
          );
        }
      })
      .catch(e => {
        this.authService.showAlert(e?.error?.message);
      });
  }

  verificar(){
    this.isVerify = true;

    this.#authService.verifyEmail(this.verifyForm.value)
      .then((response) => {
        if (response?.data?.success === 1) {
          this.authService.navigateByUrl('client/citas');
          console.log("si");
          this.isVerify = false;
          this.verifyForm.reset();
        }else{
          this.isVerify = false;
          this.authService.showToast(response?.data?.message);
        }
      })
      .catch((e) => {
        this.isVerify = false;
        this.authService.showToast(e?.error?.message);
      });
  }

  resendCode() {
    console.log('Reenviar código');
    // Aquí puedes agregar la lógica para reenviar el código
  }

  // // Función que puedes utilizar para manejar el valor del OTP
  // impresion() {
  //   console.log(this.otpValue);
  //   console.log(this.nada);
  //   // Aquí puedes agregar la lógica adicional que necesites
  // }

}
