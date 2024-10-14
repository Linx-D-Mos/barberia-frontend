import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-default-profile',
  standalone: true,
  templateUrl: './default-profile.component.html',
  styleUrls: ['./default-profile.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class DefaultProfileComponent implements OnInit {
  @Input() imageUrl: string | null = null;
  @Input() fullName: string = ''; //este seria el inpñut que recive el name

  private colors = [
    '#D9D9D9',
    // Tonos azules
    '#1E90FF', // Dodger Blue
    '#4169E1', // Royal Blue
    '#0000CD', // Medium Blue
    '#000080', // Navy
    '#4682B4', // Steel Blue
    // Tonos rojos
    '#FF0000', // Red
    '#DC143C', // Crimson
    '#B22222', // Fire Brick
    '#8B0000', // Dark Red
    '#CD5C5C', // Indian Red
  ];
  firstName: string = '';
  lastName: string = '';
  initials: string = '';
  backgroundColor: string = '';

  ngOnInit() {
    const espacios = this.fullName.trim().split(' ');
    this.firstName = espacios[0] || '';
    this.lastName = espacios[1] || '';

    this.initials = this.getInitials();
    this.backgroundColor = this.getRandomColor();
  }

  getInitials(): string {
    const firstInitial = this.firstName.charAt(0).toUpperCase();
    const lastInitial = this.lastName.charAt(0).toUpperCase();
    const completo = firstInitial.concat(lastInitial);
    return completo;
  }

  getRandomColor(): string {
    const index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }
}
