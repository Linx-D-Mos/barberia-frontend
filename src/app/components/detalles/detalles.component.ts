import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { IonicModule } from '@ionic/angular'; // Esto ya incluye todos los componentes de Ionic
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalles',
  standalone: true,
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
  imports: [
    IonicModule, // Incluye IonContent, IonHeader, IonToolbar, etc.
    ButtonModule,
    InputOtpModule,
    CommonModule,
    FormsModule
  ]
})
export class DetallesComponent implements OnInit {

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss(); // Cierra el modal
  }

  ngOnInit() {}

}
