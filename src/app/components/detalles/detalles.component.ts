import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { IonicModule } from '@ionic/angular'; // Esto ya incluye todos los componentes de Ionic
import { ModalController, NavController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-detalles',
  standalone: true,
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
  imports: [
    IonicModule, // Incluye IonContent, IonHeader, IonToolbar, etc.
    ButtonModule,
    InputOtpModule,
    CommonModule,
    FormsModule
  ]
})

export class DetallesComponent implements OnInit {
  profile: any;
  loaded: boolean = false;
  time: string = '';
  date: string = '';
  nombre: string = '';
  perfil: any;
  constructor(private modalController: ModalController) { }
  private authService = inject(AuthService);
  private nav = inject(NavController);
  #clientService = inject(ClientService);

  close() {
    this.modalController.dismiss(); // Cierra el modal
  }

  ngOnInit() {
    this.getPerfil();
    // Obtener la fecha y la hora actual
    this.updateDateTime();

    // Opcional: Actualizar la hora cada minuto
    setInterval(() => {
      this.updateDateTime();
    }, 60000); // Cada 60 segundos
  }

  updateDateTime() {
    const { date, time } = this.getCurrentDateTime();
    this.date = date;
    this.time = time;
  }

  getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return { date, time };
  }
  

  getPerfil() {
    this.authService.perfil()
      .then((response) => {
        if (response?.data?.success === 1) {
          this.perfil = response.data;
          this.nombre = this.perfil?.datum?.name;
        } else {
          this.authService.showAlert('Su token de acceso ya no es válido, por favor inicie sesión nuevamente.');
        }
      })
      .catch(e => {
        this.authService.showAlert(e?.error?.message);
      });
  }

}
