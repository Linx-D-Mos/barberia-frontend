import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonLabel, IonButton, IonImg, IonSkeletonText, IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircle, arrowBackCircleOutline, arrowBackOutline, logOutOutline, personCircleOutline, saveOutline, cameraOutline, imageOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PhotoService } from '../services/photo/photo.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class PerfilPage implements OnInit {
  capturedImage: string | undefined;

  #photoService = inject(PhotoService);

  constructor() {
    addIcons({
      arrowBackOutline,
      saveOutline,
      personCircleOutline,
      cameraOutline,
      imageOutline,
      logOutOutline,
    });
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
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      if (image.base64String) {
        await this.#photoService.uploadPhoto(image.base64String)
        .then((response) => {
          if (response?.data?.success === 1) {
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
}
