import { Component, inject, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { from, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthService } from '../../../../services/auth/auth.service';
import { DetallesComponent } from '../../../../components/detalles/detalles.component';

// Importar módulos de Ionic necesarios
import { IonicModule } from '@ionic/angular';
import { ClientService } from 'src/app/services/client/client.service';
import { Profile } from 'src/app/interfaces/client/interfaces';

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
    addIcons({ personCircleOutline });
  }

  ngOnInit() {
    this.date = new Date().toLocaleDateString();
    this.cargarDatos().subscribe();
    this.getProfile();
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

  irPerfil() {
    this.nav.navigateForward('client/perfil');
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
