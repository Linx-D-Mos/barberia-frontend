import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonInput, IonLabel, IonButton, IonIcon, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.css'],
  standalone: true,
  imports: [IonIcon, IonButton, IonLabel, IonInput, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecuperarPage implements OnInit {

  constructor (private nav : NavController) { 
    addIcons({arrowBackOutline})
  }

  ngOnInit() {
  }

  goBack(){
    this.nav.back();
  }

}
