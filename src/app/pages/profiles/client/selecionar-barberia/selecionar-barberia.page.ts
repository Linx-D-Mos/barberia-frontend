
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader,
  IonCard, IonCardSubtitle, IonCardContent, IonCardTitle, IonButton,
  IonSearchbar, ActionSheetController, ModalController, NavController
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Barbershop, Profile, Schedule } from 'src/app/interfaces/client/interfaces';
import { ClientService } from 'src/app/services/client/client.service';
import { DetallesComponent } from "../../../../components/detalles/detalles.component";
import { text } from 'ionicons/icons';

@Component({
  selector: 'app-selecionar-barberia',
  templateUrl: './selecionar-barberia.page.html',
  styleUrls: ['./selecionar-barberia.page.scss'],
  standalone: true, // Verifica que esto esté correctamente declarado
  imports: [
    IonSearchbar, IonButton, IonCardTitle, IonCardContent, IonCardSubtitle,
    IonCard, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, DetallesComponent
  ]
})
export class SelecionarBarberiaPage implements OnInit {

  profile!: Profile;
  public barberias: Barbershop[] = [];        // Lista completa de barberías
  public filteredBarberias: Barbershop[] = []; // Lista filtrada

  perfil: any;
  public loaded: boolean = false;

  private nav = inject(NavController);
  private authService = inject(AuthService);
  private clientService = inject(ClientService);

  constructor(private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.getPerfil();
    this.getBarberShops();
  }

  getPerfil() {
    this.authService.perfil()
      .then((response) => {
        if (response?.data?.success === 1) {
          this.perfil = response.data;
          console.log(this.perfil);
          this.loaded = true;
        } else {
          this.authService.showAlert(
            'Su token de acceso ya no es válido, por favor inicie sesión nuevamente.'
          );
        }
      })
      .catch(e => {
        this.authService.showAlert(e?.error?.message);
      });
  }

  getBarberShops() {
    this.clientService.getBarberShops()
      .then((response) => {
        if (response?.data?.success === 1) {
          this.barberias = response.data.barbershops;
          this.filteredBarberias = [...this.barberias]; // Inicializa la lista filtrada
          console.log(this.barberias);
          this.loaded = true;
        } else {
          this.authService.showAlert(
            'Su token de acceso ya no es válido, por favor inicie sesión nuevamente.'
          );
        }
      })
      .catch(e => {
        this.authService.showAlert(e?.error?.message);
      });
  }

  // Método para filtrar barberías por nombre
  filterBarberias(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';
    if (searchTerm) {
      this.filteredBarberias = this.barberias.filter(barberia =>
        barberia.name.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredBarberias = [...this.barberias]; // Si no hay texto, muestra todas
    }
  }

  afiliarse(barbershop_id: number) {
    this.clientService.afiliarBarberia(barbershop_id)
      .then((response) => {
        if (response.success === 1) {
          this.nav.navigateForward('client/perfil');
        }
      })
      .catch(e => {
        this.authService.showAlert(e?.error?.message);
      });
  }

  get12HourFormat(time: string): string {
    const [hour, minute] = time.split(':').map(Number); // Divide y convierte a números
    const ampm = hour >= 12 ? 'PM' : 'AM';  // Determina AM/PM
    const formattedHour = hour % 12 || 12;  // Convierte a formato 12 horas (0 => 12)
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  }

  async presentActionSheet(name: string, schedules: Schedule[], barbershop_id: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: name,
      subHeader: 'Horarios de atención',
      buttons: [
        // Mostrar horarios dinámicamente
        ...schedules.map(s => ({
          text: `${s.day}: ${this.get12HourFormat(s.start_time)} - ${this.get12HourFormat(s.end_time)}`,
        })),
        {
          text: 'Afliliarse',
          icon: 'add',
          handler: () => {
            this.afiliarse(barbershop_id);
          }
        },
        {
          text: 'Cerrar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Action Sheet cerrado');
          }
        }
      ],
      cssClass: 'action-sheet-custom-class'
    });

    await actionSheet.present();
  }


}

