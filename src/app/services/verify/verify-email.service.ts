import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.prod';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class VerifyEmailService {
  #authService = inject(AuthService);

  /**
   * Verifica el correo electrónico utilizando el servicio de autenticación.
   *
   * @param formValue - Los valores del formulario que contienen el 'code' para verificar el correo electronico.
   * @returns Una promesa que resuelve con la respuesta de la verificación del correo electrónico.
   * @throws Lanza un error si la solicitud de verificación falla.
   */
  async verifyEmail(formValue: any) {
    // Token de autenticación
    const token = await this.#authService.obtenerToken();

    const options = {
      url: environment.serverUrl + 'auth/verify_email',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(formValue),
    };

    try {
      const response = await CapacitorHttp.post(options);

      return response;
    } catch (e) {
      throw e;
    }
  }

  /* *************************************** Ejemplo de uso ******************************************* */

  /* ************************************** Fin del ejemplo ******************************************* */
}
