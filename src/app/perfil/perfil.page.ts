import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonLabel, IonButton, IonImg, IonSkeletonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircle, arrowBackCircleOutline, arrowBackOutline, logOutOutline, personCircleOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonImg, IonButton, IonLabel, IonItem, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {

  constructor() { 
    addIcons({personCircleOutline,logOutOutline,arrowBackOutline})
  }

  private authService = inject(AuthService)
  private nav = inject(NavController)

  logout() {
    this.authService.logout()
    .then((response) => {
      if (response?.data?.success === 1){
        this.authService.navigateByUrl('/login'); // Redirigir a la página de inicio de sesión
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

  ngOnInit() {
  }

  back(){
    this.nav.back();
  }

  

}
