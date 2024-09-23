import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonInput, IonItem, IonTabButton, IonButton, IonBackButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons, } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.css'],
  standalone: true,
  imports: [IonIcon, IonBackButton, IonButton, IonTabButton, IonItem, IonInput, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegistroPage implements OnInit {

  private authService = inject(AuthService);
  regisForm: any;

  constructor(private nav: NavController) {
    addIcons({ arrowBackOutline })
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
  }

  registrar() {
    this.authService.register(this.regisForm.value)
      .then((response) => {
        if (response?.data?.success === 1) {
          this.authService.navigateByUrl('/cargando'); // Redirigir a la página correspondiente
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
}
