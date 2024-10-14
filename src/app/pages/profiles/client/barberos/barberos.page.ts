import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NavController,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonGrid,
  IonRow,
  IonThumbnail,
  IonSkeletonText,
  IonChip,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { from, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Profile } from 'src/app/interfaces/client/interfaces';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DefaultProfileComponent } from 'src/app/components/default-profile/default-profile.component';
import { ServiceModalComponent } from 'src/app/components/service-modal/service-modal.component';
@Component({
  selector: 'app-barberos',
  templateUrl: './barberos.page.html',
  styleUrls: ['./barberos.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    DefaultProfileComponent,
    ServiceModalComponent,
    IonImg,
    IonGrid,
    IonRow,
    IonThumbnail,
    IonSkeletonText,
    IonChip,
  ],
})
export class BarberosPage implements OnInit {
  weekDays: { shortName: string; date: string }[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();
  monthName: string = '';
  currentDayIndex: number = 0;
  selectedDayIndex: number | null = null; // Variable para guardar el índice del día seleccionado
  users: any[] = [];
  public loaded: boolean = false;
  private nav = inject(NavController);
  profile!: Profile;
  #clientService = inject(ClientService);
  private authService = inject(AuthService);

  constructor(private modalController: ModalController) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: ServiceModalComponent,
    });
    await modal.present(); // Presenta el modal
  }

  slideOpts = {
    autoplay: {
      delay: 3000,
    },
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    navigation: true,
  };

  ngOnInit() {
    const today = new Date();
    this.startDate = this.getMonday(today);
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.endDate.getDate() + 6);

    this.monthName = this.startDate.toLocaleString('es-ES', { month: 'long' });
    this.monthName =
      this.monthName.charAt(0).toUpperCase() + this.monthName.slice(1);

    const dayNames = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(this.startDate);
      date.setDate(date.getDate() + i);
      this.weekDays.push({
        shortName: dayNames[i],
        date: date.getDate().toString().padStart(2, '0'),
      });
    }

    this.currentDayIndex = today.getDay() - 1;
    if (this.currentDayIndex === -1) this.currentDayIndex = 6; // Sunday

    // Cargar datos
    this.cargarDatos().subscribe();
  }

  cargarDatos(): Observable<HttpResponse> {
    const datos = {
      url: 'https://jsonplaceholder.typicode.com/users',
    };

    return from(CapacitorHttp.get(datos)).pipe(
      delay(3000),
      tap((response: HttpResponse) => {
        this.users = response.data;
        this.loaded = true;
      })
    );
  }

  getProfile() {
    this.#clientService.profile().then((response) => {
      // Asignando los datos del perfil
      this.profile = response.data;
      if (this.profile.success === 1) {
        this.loaded = true;
      } else {
        this.authService.showToast('No se encontraron datos.');
        this.authService.navigateByUrl('auth/login');
      }
      // capturando errores
      if (response?.status === 403) {
        this.authService.showToast(
          'No tienes permisos para realizar esta acción.'
        );
        this.authService.navigateByUrl('auth/login');
      }

      if (response?.status === 500) {
        this.authService.showToast(
          'Error en el servidor, inicie sesión nuevamente.'
        );
        this.authService.navigateByUrl('auth/login');
      }
    });
  }
  back() {
    this.nav.back();
  }

  getMonday(d: Date): Date {
    d = new Date(d);
    const day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // Ajuste para obtener el lunes
    return new Date(d.setDate(diff));
  }

  selectDay(index: number) {
    this.selectedDayIndex = index; // Actualizar el índice del día seleccionado
    console.log(
      `Día seleccionado: ${this.weekDays[index].shortName}, Fecha: ${this.weekDays[index].date}`
    );
  }
}
