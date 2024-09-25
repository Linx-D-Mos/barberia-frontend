import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBack, arrowBackOutline } from 'ionicons/icons';
import { NavController, IonicModule, ModalController } from '@ionic/angular'; // Importa solo IonicModule aquí
import { AuthService } from '../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { VerificacionModalComponent } from '../verificar-correo-modal/verificar-correo-modal.component';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';

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

  private authService = inject(AuthService);
  regisForm: any;
  email: any;

  constructor(private nav: NavController) {
    addIcons({ arrowBack, arrowBackOutline });
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
}
