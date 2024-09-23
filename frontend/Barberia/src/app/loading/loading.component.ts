import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true, // Aquí declaramos el componente como standalone
  imports: [IonicModule, CommonModule]  // Puedes añadir más módulos si son necesarios
})
export class LoadingComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
