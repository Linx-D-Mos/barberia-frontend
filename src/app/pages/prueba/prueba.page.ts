import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonNote, IonText, IonGrid, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { AlertController } from '@ionic/angular';
import { DetallesComponent } from '../../components/detalles/detalles.component';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
  standalone: true,
  imports: [DetallesComponent, ButtonModule, InputOtpModule,IonButton, IonText, IonNote, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PruebaPage implements OnInit {

  constructor(private alertController: AlertController) {}
  
  ngOnInit() {
    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '⚠️', // Solo texto en el header
      message: `Peligro`,
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  

}
