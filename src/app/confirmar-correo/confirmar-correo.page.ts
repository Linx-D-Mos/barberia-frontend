import { Component, OnInit, ViewChildren, QueryList, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonNote, IonText, IonGrid, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-confirmar-correo',
  templateUrl: './confirmar-correo.page.html',
  styleUrls: ['./confirmar-correo.page.scss'],
  standalone: true,
  imports: [ButtonModule, InputOtpModule, IonButton, IonText, IonNote, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ConfirmarCorreoPage implements OnInit {

  private authService = inject(AuthService);
  email: any;

  ngOnInit() {
    this.getEmail();
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

  resendCode() {
    console.log('Reenviar código');
    // Aquí puedes agregar la lógica para reenviar el código
  }
}
