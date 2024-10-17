import { Injectable, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  #alertCtrl = inject(AlertController);
  private icono: string = '';

  constructor() { }

  private async crearAlerta(title: string, message: string, type: string) {
    const alerta = await this.#alertCtrl
      .create({
        cssClass: this.getAlertClass(type), //Clase según el tipo
        header: this.getIconByType(type),   //Icono según el tipo
        subHeader: title,
        message: message,
        buttons: ['OK'],
      });
    await alerta.present();
  }

  private getIconByType(type: string): string {
    switch (type) {
      case 'success':
        return '☑';
      case 'error':
        return '🆇';
      case 'warning':
        return '⚠';
      case 'info':
        return '🅘';
      default:
        return 'ℹ';
    }
  }

  private getAlertClass(type: string): string {
    switch (type) {
      case 'success':
        return 'alerta-success';
      case 'error':
        return 'alerta-error';
      case 'warning':
        return 'alerta-warning';
      case 'info':
        return 'alerta-info';
      default:
        return 'alerta-default';
    }
  }

  /////////////Tipos de alertas\\\\\\\\\\\\\\\\
  infoAlert(title: string, message: string) {
    this.crearAlerta(title, message, 'info',);
  }

  successAlert(title: string, message: string) {
    this.crearAlerta(title, message, 'success');
  }

  errorAlert(title: string, message: string) {
    this.crearAlerta(title, message, 'error');
  }

  warningAlert(title: string, message: string) {
    this.crearAlerta(title, message, 'warning');
  }
}