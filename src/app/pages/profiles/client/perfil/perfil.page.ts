import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonLabel, IonButton, IonImg, IonSkeletonText, IonModal, IonTabs, IonTabBar, IonTabButton, IonThumbnail, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircle, arrowBackCircleOutline, arrowBackOutline, logOutOutline, personCircleOutline, saveOutline, cameraOutline, imageOutline, triangle, ellipse, square } from 'ionicons/icons';
import { AuthService } from '../../../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../../../services/client/client.service';
import { Profile } from '../../../../interfaces/client/interfaces';
import { DefaultProfileComponent } from 'src/app/components/default-profile/default-profile.component';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  schemas :[CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonFooter, IonTabButton, IonTabBar, IonTabs,
    DefaultProfileComponent,
    IonModal,
    IonSkeletonText,
    IonImg,
    IonButton,
    IonLabel,
    IonItem,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    IonThumbnail,
  ],
})
export class PerfilPage implements OnInit {

  /* ************************************ INYECCIONES ****************************************** */

  #clientService = inject(ClientService);

  /* ******************************** FIN DE LAS INYECCIONES ************************************ */

  profile!: Profile;

  perfil: any;
  public loaded: boolean = false;


  constructor() {
    addIcons({ arrowBackOutline, saveOutline, triangle, ellipse, square, personCircleOutline, cameraOutline, imageOutline, logOutOutline, });
  }

  private authService = inject(AuthService);
  private nav = inject(NavController);

  logout() {
    this.authService
      .logout()
      .then((response) => {
        if (response?.data?.success === 1) {
          this.authService.navigateByUrl('/auth/login'); // Redirigir a la página de inicio de sesión
          this.authService.showToast('Sesión cerrada correctamente.');
        } else {
          this.authService.showAlert(
            'Su token de acceso ya no es valido, por favor inicie sesión nuevamente.'
          );
        }
      })
      .catch((e) => {
        this.authService.showAlert(e?.error?.message);
      });
  }

  ngOnInit() {
    // this.getPerfil();
    this.getProfile();
  }

  back() {
    this.nav.back();
  }

  selectphoto(){
    this.nav.navigateForward('client/photo-profile')
  }

  getPerfil() {
    this.authService.perfil()
      .then((response) => {
        if (response?.data?.success === 1) {
          this.perfil = response.data;
          this.loaded = true;
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

  /**
   * Obtiene el perfil del usuario actual.
   * 
   * Este método llama al servicio de cliente para obtener los datos del perfil del cliente.
   * Si la respuesta es exitosa, se asignan los datos del perfil a la propiedad `profile` y se marca como cargado.
   * Si no se encuentran datos, se muestra un mensaje de error y se redirige al usuario a la página de inicio de sesión.
   * 
   * Además, maneja los siguientes errores:
   * - Si el estado de la respuesta es 403, se muestra un mensaje indicando que el usuario no tiene permisos para realizar la acción y se redirige a la página de inicio de sesión.
   * - Si el estado de la respuesta es 500, se muestra un mensaje indicando un error en el servidor y se redirige a la página de inicio de sesión.
   * 
   * @returns {void}
   */
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

  getNumber() {
    this.authService.perfil()
      .then((response) => {
        if (response?.data?.success === 1) {
          this.perfil = response.data;
          this.loaded = true;
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
