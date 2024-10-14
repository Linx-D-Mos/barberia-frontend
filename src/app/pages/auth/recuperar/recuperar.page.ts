import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { IonText, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonInput, IonLabel, IonButton, IonIcon, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    ReactiveFormsModule,
    IonButton,
    IonText,
    IonLabel,
    IonInput,
    IonItem,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule
  ]
})
export class RecuperarPage implements OnInit {
  private authService = inject(AuthService);
  isExist: boolean = false;
  emailForm!: FormGroup;

  constructor(private nav: NavController) {
    addIcons({ arrowBackOutline });
  }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  verificar() {
    this.isExist = true;

    this.authService.verificarEmail(this.emailForm.value)
      .then((response) => {
        const emailValue = this.emailForm.get('email')?.value; // Obteniendo el valor del correo
        if (response?.data?.success === 1) {
          this.authService.setEmail(emailValue); // Almacena el correo en el servicio
          console.log('Email guardado:', emailValue); // Muestra el valor del correo en la consola
          this.authService.navigateByUrl('auth/confirmar-correo/recuperar');
          this.isExist = false;
          this.emailForm.reset();
        } else {
          this.isExist = false;
          this.authService.showAlert(response?.data?.message);
        }
      })
      .catch(e => {
        console.log(e);
        this.isExist = false;
        this.authService.showAlert(e?.error?.message);
      });
  }

  goBack() {
    this.nav.back();
  }
}
