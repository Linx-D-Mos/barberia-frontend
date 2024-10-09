import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NavController, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonLabel, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline, arrowBackOutline, cameraOutline, imageOutline, cloudUploadOutline, roseSharp } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from '../services/auth/auth.service';

import { PhotoService } from '../services/photo/photo.service';
import { ClientService } from '../services/client/client.service';
import { Profile } from '../interfaces/client/interfaces';
@Component({
  selector: 'app-photo-profile',
  templateUrl: './photo-profile.page.html',
  styleUrls: ['./photo-profile.page.scss'],
  standalone: true,
  imports: [IonImg,   IonLabel, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PhotoProfilePage implements OnInit {

  private nav = inject(NavController);
  photo : string = "";

  #photoService = inject(PhotoService);
  private authService = inject(AuthService);
  profile!: Profile;
  #clientService = inject(ClientService);
  public loaded: boolean = false;




  constructor() {
    addIcons({arrowBackOutline,cameraOutline,cloudUploadOutline,imageOutline,arrowBackCircleOutline});
   }

  ngOnInit() {
    this.getProfile();
    Camera.requestPermissions();
  }

  back() {
    this.nav.back();
  }

  /**
   * Abre la galería de fotos del dispositivo y permite al usuario seleccionar una imagen.
   * La imagen seleccionada se obtiene en formato Base64 y se sube a un servidor de fotos.
   * 
   * @async
   * @function
   * @throws {Error} Si ocurre un error al tomar la foto o al subir la imagen.
   * 
   * @example
   * ```typescript
   * this.openGallery();
   * ```
   */
  async openGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Base64, // Puedes usar Base64 o URI
        source: CameraSource.Photos, // O usa CameraSource.Camera para la cámara
      });

      if (image.base64String) {
        await this.#photoService.uploadPhoto(image.base64String)
        .then((response) => {
          if (response?.data?.success === 1) {
            this.photo = response?.data?.photo_url;
            this.authService.showToast(response?.data?.message);
          } else {
            this.authService.showToast(response?.data?.message);
            this.authService.showToast(response?.data?.errors?.photo);
          }
        })
        .catch((e) => {
          this.authService.showToast(e?.error?.message);
        });
      } else {
        console.error('No se pudo obtener la imagen en formato Base64');
      }
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }

  /**
   * Toma una foto utilizando la cámara del dispositivo y la sube a un servicio de fotos.
   * 
   * @returns {Promise<void>} Una promesa que se resuelve cuando la operación de tomar y subir la foto ha finalizado.
   * 
   * @throws {Error} Si ocurre un error al tomar la foto.
   * 
   * @remarks
   * - La foto se toma con una calidad del 100% y permite edición.
   * - El resultado de la foto se obtiene en formato Base64.
   * - Si la foto se sube exitosamente, se muestra un mensaje de éxito.
   * - Si ocurre un error durante la subida de la foto, se muestra un mensaje de error.
   */
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      if (image.base64String) {
        await this.#photoService.uploadPhoto1(image)
        .then((response) => {
          if (response?.data?.success === 1) {
            this.authService.showToast(response?.data?.message);
            this.authService.showToast('Foto subida con éxito.');
          } else {
            this.authService.showToast(response?.data?.message);
            this.authService.showToast(response?.data?.errors?.photo);
            this.authService.showToast('No se pudo subir la foto. Success: ' + response?.data?.success);
          }
        })
        .catch((e) => {
          this.authService.showToast(e?.error?.message);
          this.authService.showToast('Error al subir la foto.');
        });
      } else {
        console.error('No se pudo obtener la imagen en formato Base64');
        this.authService.showToast('No se pudo obtener la imagen en formato Base64');
      }
    } catch (error) {
      console.error('Error al tomar la foto: ', error);
      this.authService.showToast(`Error al tomar la foto: ${error}`);
    }
  }

  getProfile() {
    this.#clientService.profile()
    .then((response) => {
      // Asignando los datos del perfil
      this.profile = response.data;
      if (this.profile.success === 1){
        this.loaded =  true;
      }else{
        this.authService.showToast('No se encontraron datos.');
        this.authService.navigateByUrl('/login');
      }
      // capturando errores
      if (response?.status === 403) {
        this.authService.showToast('No tienes permisos para realizar esta acción.');
        this.authService.navigateByUrl('/login');
      }

      if (response?.status === 500) {
        this.authService.showToast('Error en el servidor, inicie sesión nuevamente.');
        this.authService.navigateByUrl('/login');
      }
    })
  }


}
