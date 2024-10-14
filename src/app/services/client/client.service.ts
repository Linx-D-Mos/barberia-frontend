import { inject, Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../auth/auth.service';
import { Profile } from 'src/app/interfaces/client/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  /* ************************************ INYECCIONES ****************************************** */

  #authService = inject(AuthService);

  /* ******************************** FIN DE LAS INYECCIONES ************************************ */

  /**
   * Obtiene el perfil del cliente.
   *
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta del perfil del cliente.
   * @throws {Error} Lanza un error si la solicitud HTTP falla.
   */
  async profile() {
    // Token de autenticación
    const token = await this.#authService.obtenerToken();

    const options = {
      url: environment.serverUrl + 'client/profile',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await CapacitorHttp.get(options);

      return response;
    } catch (e) {
      throw e;
    }
  }

  //obtener las barberias para afiliarse
  async getBarberShops() {
    // Token de autenticación
    const token = await this.#authService.obtenerToken();

    const options = {
      url: environment.serverUrl + 'client/barbershops',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await CapacitorHttp.get(options);

      return response;
    } catch (e) {
      throw e;
    }
  }

  //afiliar cliente a barberia
  async afiliarBarberia(barbershop_id: number) {
    const data = { "barbershop_id": barbershop_id };
    // Token de autenticación
    const token = await this.#authService.obtenerToken();

    const options = {
      url: environment.serverUrl + 'client/barbershop_affiliate',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    };

    try {
      const response = await CapacitorHttp.put(options);

      return response.data;
    } catch (e) {
      throw e;
    }
  }



}
