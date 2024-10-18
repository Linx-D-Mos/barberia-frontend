import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonLabel, IonSkeletonText, IonIcon, IonCard, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonButton, IonList, IonItem, IonFooter, IonFab, IonFabButton, IonText } from '@ionic/angular/standalone';
import { Profile } from 'src/app/interfaces/client/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClientService } from 'src/app/services/client/client.service';
import { personCircleOutline, add, homeOutline, notificationsOutline, notifications, home, cameraOutline, imageOutline } from 'ionicons/icons';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { DetallesComponent } from 'src/app/components/detalles/detalles.component';
import { delay, from, Observable, tap } from 'rxjs';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { DefaultProfileComponent } from "../../../../components/default-profile/default-profile.component";

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  standalone: true,
  imports: [IonText, IonFabButton, IonFab, IonFooter, IonItem, IonList, IonButton, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonCard, IonIcon, IonSkeletonText, IonLabel, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, DefaultProfileComponent]
})
export class CitasPage implements OnInit {

  profile!: Profile;
  users: any[] = [];
  time: string = '';
  date: string = '';
  public loaded: boolean = false;
  public ionContentList = [1, 2, 3, 4, 5, 6, 7, 8];// Lista de contenido para el skeleton
  private nav = inject(NavController);
  private authService = inject(AuthService);
  #clientService = inject(ClientService);

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    public modalController: ModalController
  ) {
    addIcons({personCircleOutline,add,cameraOutline,imageOutline,home,notifications});
  }

  ngOnInit() {
    this.date = new Date().toLocaleDateString();
    this.getProfile();
  }

  async openShare() {
    const modal = await this.modalController.create({
      component: DetallesComponent,
      initialBreakpoint: 0.74,
      breakpoints: [0.5, 0.5],
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss().then(() => {
      this.closeShare(modal); // Llama a la función de cerrar modal
    });
    return await modal.present();
  }

  async closeShare(modal: HTMLIonModalElement) {
    await modal.dismiss(); // Cierra el modal
  }



  getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { date, time };
  }

  irPerfil() {
    this.nav.navigateForward('client/perfil');
  }
  elegirBarber() {
    this.nav.navigateForward('client/barberos');
  }

  getProfile() {
    this.#clientService.profile()
      .then((response) => {
        // Asignando los datos del perfil
        this.profile = response.data;
        if (this.profile.success === 1) {
          this.loaded = true;
        } else {
          this.authService.showToast('No se encontraron datos.');
          this.authService.navigateByUrl('auth/login');
        }
        if (this.profile.data.barbershop_id == null) {
          this.nav.navigateForward('client/selecionar-barberia');
        }

        // capturando errores
        if (response?.status === 403) {
          this.authService.showToast('No tienes permisos para realizar esta acción.');
          this.authService.navigateByUrl('auth/login');
        }

        if (response?.status === 500) {
          this.authService.showToast('Error en el servidor, inicie sesión nuevamente.');
          this.authService.navigateByUrl('auth/login');
        }
      })
  }
}
