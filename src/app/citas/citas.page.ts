import { Component, inject, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { from, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { DetallesComponent } from '../components/detalles/detalles.component';

// Importar módulos de Ionic necesarios
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule // Agregamos IonicModule para acceder a los componentes de Ionic
  ]
})
export class CitasPage implements OnInit {

  users: any[] = [];
  date: string = '';
  perfil: any;
  public loaded: boolean = false;
  public ionContentList = [1, 2, 3, 4, 5, 6, 7, 8];
  private nav = inject(NavController);
  private authService = inject(AuthService);

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    public modalController: ModalController
  ) {
    addIcons({ personCircleOutline });
  }

  ngOnInit() {
    this.date = new Date().toLocaleDateString();
    this.cargarDatos().subscribe();
    this.getPerfil();
  }

  async openShare() {
    const modal = await this.modalController.create({
      component: DetallesComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1],
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


  cargarDatos(): Observable<HttpResponse> {
    const datos = {
      url: 'https://jsonplaceholder.typicode.com/users'
    };

    return from(CapacitorHttp.get(datos)).pipe(
      delay(3000),
      tap((response: HttpResponse) => {
        this.users = response.data;
        this.loaded = true;
      })
    );
  }

  getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { date, time };
  }

  profile() {
    this.nav.navigateForward('/perfil');
  }

  getPerfil() {
    this.authService.perfil()
      .then((response) => {
        if (response?.data?.success === 1) {
          this.perfil = response.data;
        } else {
          this.authService.showAlert(
            'Su token de acceso ya no es valido, por favor inicie sesión nuevamente.'
          );
        }
      })
      .catch(e => {
        this.authService.showAlert(e?.error?.message);
      });
  }
}
