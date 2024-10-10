import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-barber',
  templateUrl: './barber.page.html',
  styleUrls: ['./barber.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, CommonModule]
})
export class BarberPage {

  constructor() { }

}
