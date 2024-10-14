import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Gesture, GestureController, IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-swipe-button',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './swipe-button.component.html',
  styleUrls: ['./swipe-button.component.scss'],
})
export class SwipeButtonComponent {
  @ViewChild('swipeButton', { static: true }) swipeButton!: ElementRef;
  @ViewChild('swipeTrack', { static: true }) swipeTrack!: ElementRef;
  swipeComplete: boolean = false;

  constructor(
    private gestureCtrl: GestureController, 
    private modalController: ModalController,
    private cdr: ChangeDetectorRef
  ) {}

  private router = inject(Router);

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.initializeSwipeGesture();
  }

  initializeSwipeGesture() {
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.swipeButton.nativeElement,
      gestureName: 'swipe-button',
      onStart: () => {
        console.log('Gesture started');
        this.swipeComplete = false;
        this.updateButtonPosition(0); // Reinicia la posición al inicio
      },
      onMove: (ev) => {
        const swipeTrackWidth = this.swipeTrack.nativeElement.offsetWidth; // Obtener el ancho de la pista
        const translateX = Math.max(0, Math.min(ev.deltaX, swipeTrackWidth - 60)); // Limitar movimiento al ancho de la pista
        this.updateButtonPosition(translateX);
      },
      onEnd: (ev) => {
        const swipeTrackWidth = this.swipeTrack.nativeElement.offsetWidth; // Obtener el ancho de la pista
        if (ev.deltaX > (swipeTrackWidth - 60) / 2) {
          this.swipeComplete = true;
          this.updateButtonPosition(swipeTrackWidth - 60); // Desplazar el botón hasta el final
        } else {
          this.updateButtonPosition(0); // Regresar a la posición original
        }
        this.cdr.detectChanges(); // Forzar la detección de cambios
      }
    });

    gesture.enable(true);
  }

  private updateButtonPosition(translateX: number) {
    this.swipeButton.nativeElement.style.transform = `translateX(${translateX}px)`;
  }
}
