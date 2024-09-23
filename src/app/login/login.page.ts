import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonImg, IonButton, IonBackButton, IonTabButton, IonLabel, NavController, IonSpinner, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.css'],
  standalone: true,
  imports: [IonInputPasswordToggle, IonSpinner, ReactiveFormsModule, IonLabel, IonTabButton, IonBackButton, IonButton, IonImg, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, RouterModule, RouterOutlet],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup; // Formulario de login

  isLogin = false; 

  /**
   * Variable para almacenar la contraseña
   */
  pass: any;

  // private authService = inject(Auth2Service);
  private authService = inject(AuthService);
  
  ngOnInit() {
    /* Inincializamos el formulario */
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /* Función para el login */
  login() {
    this.isLogin = true;

    this.authService.login(this.loginForm.value)
      .then((response) => {
        if (response?.data?.success === 1) {
          this.authService.navigateByUrl('/cargando');
          this.isLogin = false;
          this.loginForm.reset();
        }else{
          this.isLogin = false;
          this.authService.showAlert(response?.data?.message);
        }
      })
      .catch((e) => {
        this.isLogin = false;
        this.authService.showAlert(e?.error?.message);
      });
  }

  
  /**
   * Función para obtener el valor del input de la contraseña
   * @param ev 
   */
  onInput(ev: any) {
    this.pass = ev.target!.value;
  }


}
