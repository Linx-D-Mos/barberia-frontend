import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonNote, IonText, IonGrid, IonCol, IonRow, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
  standalone: true,
  imports: [ButtonModule, InputOtpModule,IonButton, IonText, IonNote, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PruebaPage implements OnInit {
  
  ngOnInit() {
    
  }

}
