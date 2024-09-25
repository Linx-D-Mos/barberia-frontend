import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonButtons, IonNote, IonText, IonActionSheet, IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonInput, IonItem, IonTabButton, IonButton, IonBackButton, IonIcon } from '@ionic/angular/standalone';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-verificacion-modal',
  standalone: true,
  templateUrl: './verificar-correo-modal.component.html',
  styleUrls: ['./verificar-correo-modal.component.css'],
  imports: [IonButtons, IonNote, IonText, InputOtpModule,ButtonModule,IonActionSheet, IonIcon, IonBackButton, IonButton, IonTabButton, IonItem, IonInput, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VerificacionModalComponent {

  @Input() email: any; // Recibimos la propiedad del email desde el componente padre

  constructor(private modalController: ModalController) {}

  resendCode() {
    console.log('Reenviar código');
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
