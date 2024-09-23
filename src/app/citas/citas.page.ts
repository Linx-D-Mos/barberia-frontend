import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonListHeader, IonList, IonItem, IonThumbnail, IonSkeletonText, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonFooter, IonCardContent, IonButton, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonLabel, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { from, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.css'],
  standalone: true,
  imports: [IonListHeader, IonList, IonItem, IonThumbnail, IonSkeletonText, IonImg, IonLabel, IonIcon, IonCardSubtitle, IonCardTitle, IonCardHeader, IonButton, IonCardContent, IonFooter, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CitasPage implements OnInit {

  users: any[] = [];
  date: string = '';
  public loaded: boolean = false;
  public ionContentList = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController 
  ) {
    addIcons({ personCircleOutline });
  }

  ngOnInit() {
    this.date = new Date().toLocaleDateString();
    this.cargarDatos().subscribe();
  }

  // Cambiado el tipo de retorno a Observable<HttpResponse>
  cargarDatos(): Observable<HttpResponse> {
    const datos = {
      url: 'https://jsonplaceholder.typicode.com/users'
    };

    // Convierte la promesa de CapacitorHttp.get en un observable usando from()
    return from(CapacitorHttp.get(datos)).pipe(
      delay(3000), // Simulamos un retraso de 2 segundos
      tap((response: HttpResponse) => {
        this.users = response.data; // Asignamos los datos a la propiedad users
        this.loaded = true; // Cambia el estado de `loaded`
      })
    );
  }

  getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { date, time };
  }

  public async presentActionSheet(user: any) {
    const { date, time } = this.getCurrentDateTime();
    const actionSheet = await this.actionSheetController.create({
      header: 'Detalles de la cita',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: `${user.name}`,
          icon: personCircleOutline,  
          handler: () => { }
        },
        {
          text: `Fecha: ${date}`,
          handler: () => { }
        },
        {
          text: `Hora: ${time}`,
          handler: () => { }
        },
        {
          text: `Servicio: Consulta`,
          handler: () => { }
        },
        {
          text: 'Aceptar',
          role: 'accept',
          handler: () => {
            this.showAlert('Cita aceptada', 'Has aceptado la cita.');
          }
        },
        {
          text: 'Rechazar',
          role: 'reject',
          handler: () => {
            this.showAlert('Cita rechazada', '¿Estas seguro?');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Si']
    });

    await alert.present();
  }
}
