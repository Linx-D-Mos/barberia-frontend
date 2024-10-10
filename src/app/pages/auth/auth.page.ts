import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, CommonModule]
})
export class AuthPage {

  constructor() { }

}
