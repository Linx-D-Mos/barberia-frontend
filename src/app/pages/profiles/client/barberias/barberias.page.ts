import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonButtons, IonModal, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-barberias',
  templateUrl: './barberias.page.html',
  styleUrls: ['./barberias.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonModal, IonButtons, IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonItem, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BarberiasPage implements OnInit {

  isModalOpen = false;

  constructor() { }

  ngOnInit() {
    
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
}

}
