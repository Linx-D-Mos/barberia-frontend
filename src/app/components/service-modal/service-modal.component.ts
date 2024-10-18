import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import {IonSkeletonText, IonList, IonLabel, IonContent ,IonItem , IonTitle,IonIcon, ModalController, IonHeader , IonToolbar, IonToggle , IonButton  } from '@ionic/angular/standalone';
import {  SwipeButtonComponent } from '../swipe-button/swipe-button.component'; 
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BarbersService } from 'src/app/services/barber/barbers.service';
import { ServicesClient } from 'src/app/interfaces/client/interfaces';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss'],
  standalone : true,
  schemas :[CUSTOM_ELEMENTS_SCHEMA],
  imports : [IonSkeletonText, CommonModule, IonList,IonContent ,IonItem, IonLabel,IonTitle,IonIcon, SwipeButtonComponent , IonHeader,  IonToolbar, IonToggle , IonButton  ],
})
export class ServiceModalComponent  implements OnInit {
#authService = inject(AuthService)
#barberService = inject(BarbersService)
  services!: ServicesClient;
  loaded!: boolean;
  constructor(private modalController: ModalController) {
    addIcons({arrowBack})
  }
  
  closeModal() {
    this.modalController.dismiss();
  }
  

  ngOnInit() {
    this.getServicesClient();
  }
  
  getServicesClient() {
    this.#barberService.getServices()
      .then((response) => {
        if (response?.data?.success === 1) {
          this.services = response.data;
          this.loaded = true;
        } else {
          this.#authService.showAlert(
            'Su token de acceso ya no es valido, por favor inicie sesión nuevamente.'
          );
        }
      })
      .catch(e => {
        this.#authService.showAlert(e?.error?.message);
      });
  }

}
