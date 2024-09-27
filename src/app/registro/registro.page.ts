import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBack, arrowBackOutline, cameraOutline, imageOutline } from 'ionicons/icons';
import { NavController, IonicModule, ModalController } from '@ionic/angular'; // Importa solo IonicModule aquí
import { AuthService } from '../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { VerificacionModalComponent } from '../verificar-correo-modal/verificar-correo-modal.component';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    InputOtpModule,
    IonicModule, // Solo necesitas IonicModule para los componentes de Ionic
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistroPage implements OnInit {

  capturedImage: string | undefined;

  private authService = inject(AuthService);
  regisForm: any;
  email: any;

  constructor(private nav: NavController) {
    addIcons({ arrowBack, arrowBackOutline,cameraOutline , imageOutline});
  }

  ngOnInit() {
    this.regisForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      ]),
      password_confirmation: new FormControl('', [Validators.required]),
    });
    this.getEmail();
  }

  registrar() {
    this.authService.register(this.regisForm.value)
      .then((response) => {
        if (response?.data?.success === 1) {
          this.authService.navigateByUrl('/barberias');
          this.regisForm.reset();
        } else {
          this.authService.showAlert(response?.data?.message);
        }
      })
      .catch(e => {
        this.authService.showAlert(e?.error?.message);
      });
  }

  goBack() {
    this.nav.back();
  }

  resendCode() {
    console.log('Reenviar código');
  }

  getEmail() {
    this.authService.perfil()
      .then((response) => {
        if (response?.data?.success === 1) {
          this.email = response.data;
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

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri, // Puedes usar Base64 o URI
      source: CameraSource.Camera, // O usa CameraSource.Photos para la galería
    });

    // Aquí obtendrás la imagen en formato base64
    this.capturedImage = image.webPath; // Usa webPath para mostrar la imagen
  }

  async selectPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri, // Puedes usar Base64 o URI
      source: CameraSource.Camera, // O usa CameraSource.Photos para la galería
    });

       // Subir la imagen al servidor
    //this.capturedImage = image.dataUrl;
    //const formData = new FormData();
    //formData.append('file', this.dataURItoBlob(this.capturedImage), 'image.jpeg');

    //this.http.post('https://tu-servidor.com/upload', formData).subscribe(
     // (response) => {
      //  console.log('Imagen subida con éxito');
     // },
      //(error) => {
      //  console.log('Error al subir la imagen:', error);
     // }
   // );

    // Convertir Base64 a Blob
  //dataURItoBlob(dataURI: string) {
    //const byteString = atob(dataURI.split(',')[1]);
    //const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    //const ab = new ArrayBuffer(byteString.length);
    //const ia = new Uint8Array(ab);

    //for (let i = 0; i < byteString.length; i++) {
      //ia[i] = byteString.charCodeAt(i);
    //}

  //  return new Blob([ab], { type: mimeString });
  //}

    // Aquí obtendrás la imagen en formato base64
    this.capturedImage = image.webPath; // Usa webPath para mostrar la imagen
  }



 
}
