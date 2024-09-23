import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; // Importar Router desde @angular/router
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.page.html',
  styleUrls: ['./cargando.page.css'], // Cambia a .scss si estás usando SCSS
  standalone: true,
  imports: [LoadingComponent,CommonModule, FormsModule, IonicModule]
})

export class CargandoPage implements OnInit {

  constructor(private router: Router) { } // Asegúrate de usar 'router' en minúscula

  ngOnInit() {
    // Después de 3 segundos, redirige a la página de citas
    setTimeout(() => {
      console.log("holaaaa");
      this.router.navigate(['/citas']);
    }, 3000); // Redirige después de 3000ms (3 segundos)
  }
}