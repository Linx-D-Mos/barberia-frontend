import { Component, OnInit } from '@angular/core';
import { IonList, IonLabel, IonContent ,IonItem , IonTitle,IonIcon, ModalController, IonHeader , IonToolbar, IonToggle , IonButton  } from '@ionic/angular/standalone';
import {  SwipeButtonComponent } from '../swipe-button/swipe-button.component'; 
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss'],
  standalone : true,
  imports : [IonList,IonContent ,IonItem, IonLabel,IonTitle,IonIcon, SwipeButtonComponent , IonHeader,  IonToolbar, IonToggle , IonButton  ],
})
export class ServiceModalComponent  implements OnInit {

  constructor(private modalController: ModalController) {
    addIcons({arrowBack})
  }
  
  closeModal() {
    this.modalController.dismiss();
  }
  

  ngOnInit() {}
  
  

}
