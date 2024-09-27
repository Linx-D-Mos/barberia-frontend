import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonLabel, IonButton, IonImg, IonSkeletonText, IonModal, IonTabs, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircle, arrowBackCircleOutline, arrowBackOutline, logOutOutline, personCircleOutline, saveOutline, cameraOutline, imageOutline, triangle, ellipse, square } from 'ionicons/icons';
import { AuthService } from '../services/auth/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonTabButton, IonTabBar, IonTabs, 
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
    RouterModule
  ],
})
export class PerfilPage implements OnInit {

  perfil: any;
  public loaded: boolean = false;
 

  constructor() {
    addIcons({arrowBackOutline,saveOutline,triangle,ellipse,square,personCircleOutline,cameraOutline,imageOutline,logOutOutline,});
  }

  private authService = inject(AuthService);
  private nav = inject(NavController);

  logout() {
    this.authService
      .logout()
      .then((response) => {
        if (response?.data?.success === 1) {
          this.authService.navigateByUrl('/login'); // Redirigir a la página de inicio de sesión
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
    this.getPerfil();
  }

  back() {
    this.nav.back();
  }

  getPerfil() {
    this.authService.perfil()
    .then((response) => {
      if (response?.data?.success === 1){
        this.perfil = response.data;
        this.loaded =  true;
      }else{
        this.authService.showAlert(
          'Su token de acceso ya no es valido, por favor inicie sesión nuevamente.'
        );
      }
    })
    .catch(e => {
      this.authService.showAlert(e?.error?.message);
    });
  }

  getNumber() {
    this.authService.perfil()
    .then((response) => {
      if (response?.data?.success === 1){
        this.perfil = response.data;
        this.loaded =  true;
      }else{
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
