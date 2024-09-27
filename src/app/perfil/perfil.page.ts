import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonLabel, IonButton, IonImg, IonSkeletonText, IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircle, arrowBackCircleOutline, arrowBackOutline, logOutOutline, personCircleOutline, saveOutline, cameraOutline, imageOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonModal, IonSkeletonText, IonImg, IonButton, IonLabel, IonItem, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {
  capturedImage: string | undefined;



  constructor() { 
    addIcons({arrowBackOutline,saveOutline,personCircleOutline,cameraOutline,imageOutline,logOutOutline});
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

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri, // Puedes usar Base64 o URI
      source: CameraSource.Camera, // O usa CameraSource.Photos para la galería
    });

    // Aquí obtendrás la imagen en formato base64
    //this.capturedImage = image.webPath // Usa webPath para mostrar la imagen
  

     this.capturedImage = image.webPath;

     console.log(this.capturedImage)

  //   // Subir la imagen al servidor
  //   const formData = new FormData();
  //   formData.append('file', this.dataURItoBlob(this.capturedImage), 'image.jpeg');

  //   this.http.post('https://tu-servidor.com/upload', formData).subscribe(
  //     (response) => {
  //       console.log('Imagen subida con éxito');
  //     },
  //     (error) => {
  //       console.log('Error al subir la imagen:', error);
  //     }
  //   );
  // }

  // // Convertir Base64 a Blob
  // dataURItoBlob(dataURI: string) {
  //   const byteString = atob(dataURI.split(',')[1]);
  //   const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  //   const ab = new ArrayBuffer(byteString.length);
  //   const ia = new Uint8Array(ab);

  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }

  //   return new Blob([ab], { type: mimeString });
  // }
  }

  async openGallery(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri, // Puedes usar Base64 o URI
      source: CameraSource.Photos, // O usa CameraSource.Camera para la cámara
      });

      this.capturedImage = image.webPath;

      //   this.capturedImage = image.dataUrl;

  //   // Subir la imagen al servidor
  //   const formData = new FormData();
  //   formData.append('file', this.dataURItoBlob(this.capturedImage), 'image.jpeg');

  //   this.http.post('https://tu-servidor.com/upload', formData).subscribe(
  //     (response) => {
  //       console.log('Imagen subida con éxito');
  //     },
  //     (error) => {
  //       console.log('Error al subir la imagen:', error);
  //     }
  //   );
  // }

  // // Convertir Base64 a Blob
  // dataURItoBlob(dataURI: string) {
  //   const byteString = atob(dataURI.split(',')[1]);
  //   const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  //   const ab = new ArrayBuffer(byteString.length);
  //   const ia = new Uint8Array(ab);

  //   for (let i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }

  //   return new Blob([ab], { type: mimeString });
  // }

      
  }
  

}
