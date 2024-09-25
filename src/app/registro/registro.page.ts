import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonActionSheet, IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonInput, IonItem, IonTabButton, IonButton, IonBackButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons, } from 'ionicons';
import { arrowBack, arrowBackOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonActionSheet, RouterLink, IonIcon, IonBackButton, IonButton, IonTabButton, IonItem, IonInput, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistroPage implements OnInit {

  private authService = inject(AuthService);
  regisForm: any;

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
  }

  registrar() {
    this.authService.register(this.regisForm.value)
      .then((response) => {
        if (response?.data?.success === 1) {

          this.authService.navigateByUrl('/barberias'); // Redirigir a la página correspondiente
          this.regisForm.reset();
        } else {
          this.authService.showAlert(response?.data?.message);
        }
      })
      .catch(e => {
        this.authService.showAlert(e?.error?.message);
      });
  }

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];


  goBack() {
    this.nav.back();
  }
}
