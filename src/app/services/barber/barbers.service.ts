import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../auth/auth.service';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class BarbersService {

  #authService = inject(AuthService);
  constructor() { }


  async getServices(){
    // Token de autenticación
    const token = await this.#authService.obtenerToken();

    const options = {
      url: environment.serverUrl + 'client/barbershop_services',
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
