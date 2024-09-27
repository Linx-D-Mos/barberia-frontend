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
}
