import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /* ************************************ INYECCIONES ****************************************** */

  /**
   * @private
   * @property {Router} #router - Inyección del servicio Router para la navegación en la aplicación.
   */
  #router = inject(Router);

  /**
   * @private
   * @property {AlertController} #alertCtrl - Inyección del servicio AlertController para mostrar alertas.
   */
  #alertCtrl = inject(AlertController);

  /* ******************************** FIN DE LAS INYECCIONES ************************************ */

  /**
   * Inicialmente establecido en null. Este sujeto puede ser utilizado para emitir
   * nuevos valores de token y suscribirse a los cambios en el token.
   * Escribe to changes in the token.
   *
   * @private
   * @type {BehaviorSubject<any>}
   */
  #token = new BehaviorSubject<any>(null);

  /**
   * Obtiene el token como un observable.
   *
   * @returns {Observable<string>} Un observable que emite el valor del token.
   */
  get token() {
    return this.#token.asObservable();
  }

  /**
   * Actualiza el token de autenticación.
   *
   * @param token - El nuevo token de autenticación.
   */
  actualizarToken(token: string | null) {
    this.#token.next(token);
  }

  /**
   * Actualiza el token en el almacenamiento local.
   * Esto se hace para que el token persista incluso
   * después de que la aplicación se cierre y se vuelva a abrir.
   *
   * @param token - El nuevo token que se va a almacenar.
   * @returns Una promesa que se resuelve cuando el token ha sido almacenado.
   */
  async actualizarTokenEnLocal(token: string) {
    await Preferences.set({
      key: 'token',
      value: token,
    });
  }

  /**
   * Establece el token de autenticación.
   *
   * Este método actualiza el token de autenticación en la aplicación y lo guarda en el almacenamiento local.
   *
   * @param token - El token de autenticación que se va a establecer.
   */
  establecerToken(token: string) {
    this.actualizarToken(token);
    this.actualizarTokenEnLocal(token);
  }

  /**
   * Obtiene el token de autenticación almacenado.
   *
   * Este método obtiene el token almacenado en las preferencias del usuario utilizando la clave 'token'.
   *
   * @returns {Promise<string>} Una promesa que se resuelve con el token almacenado.
   * @throws Lanza una excepción si no se encuentra el token almacenado.
   */
  async obtenerToken() {
    const token = await Preferences.get({ key: 'token' });

    if (!token) {
      throw new Error('Token no encontrado');
    }

    return token.value;
  }

  /**
   * Elimina el token de autenticación almacenado.
   *
   * Este método actualiza el token a `null` y luego elimina el token almacenado
   * en las preferencias del usuario utilizando la clave 'token'.
   *
   * @returns {Promise<void>} Una promesa que se resuelve cuando el token ha sido eliminado.
   */
  async eliminarToken() {
    this.actualizarToken(null);
    await Preferences.remove({ key: 'token' });
  }

  /**
   * Registra un nuevo usuario utilizando los valores del formulario proporcionados.
   *
   * @param formValue - Los valores del formulario que contienen la información del usuario a registrar.
   * @returns Una promesa que resuelve con la respuesta del servidor si el registro es exitoso.
   * @throws Lanza una excepción si ocurre un error durante el proceso de registro.
   */
  async register(formValue: any) {
    const options = {
      url: environment.serverUrl + 'auth/register',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(formValue),
    };

    try {
      const response = await CapacitorHttp.post(options);

      this.establecerToken(response?.data?.token);

      return response;
    } catch (e) {
      throw e;
    }
  }

  /* ****************************** Ejemplo de uso en la página de REGISTRO *************************** */
  /* 
  
  regitrar() {
    this.isRegister = true;

    this.authService.register(this.registerForm.value)
    .then((response) => {
      if (response?.data?.success === 1){
        this.authService.navigateByUrl('/ruta'); // Redirigir a la página correspondiente
        this.isRegister = false;
        this.registerForm.reset();
      }else{
        this.isRegister = false;
        this.authService.showAlert(response?.data?.message);
      }
    })
    .catch(e => {
      console.log(e);
      this.isRegister = false;
      this.authService.showAlert(e?.error?.message);
    });
  }
  
  */
  /* ************************************** Fin del ejemplo ******************************************* */

  /**
   * Inicia sesión con las credenciales proporcionadas.
   *
   * @param formValue - Los valores del formulario que contienen las credenciales del usuario.
   * @returns Una promesa que resuelve con la respuesta del servidor si el inicio de sesión es exitoso.
   * @throws Lanza una excepción si ocurre un error durante el proceso de inicio de sesión.
   */
  async login(formValue: any) {
    const options = {
      url: environment.serverUrl + 'auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(formValue),
    };

    try {
      const response = await CapacitorHttp.post(options);

      this.establecerToken(response?.data?.token);

      return response;
    } catch (e) {
      throw e;
    }
  }

  /* ****************************** Ejemplo de uso en la página de LOGIN *************************** */
  /* 

  login() {
    this.isLogin = true;

    this.authService.login(this.loginForm.value)
    .then((response) => {
      if (response?.data?.success === 1){
        this.authService.navigateByUrl('/ruta'); // Redirigir a la página correspondiente
        this.isLogin = false;
        this.loginForm.reset();
      }else{
        this.isLogin = false;
        this.authService.showAlert(response?.data?.message);
      }
    })
    .catch(e => {
      this.isLogin = false;
      this.authService.showAlert(e?.error?.message);
    });
  }
  
  */
  /* ************************************** Fin del ejemplo ******************************************* */

  /**
   * Cierra la sesión del usuario.
   *
   * @returns Una promesa que resuelve con la respuesta del servidor si el cierre de sesión es exitoso.
   * @throws Lanza una excepción si ocurre un error durante el proceso de cierre de sesión.
   */
  async logout() {
    // Token de autenticación
    const token = await this.obtenerToken();
    // const token1 = this.#token.value;
    // console.log(`Token en el observabla: ${token1}`);

    const options = {
      url: environment.serverUrl + 'auth/logout',
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

  /* ***************************************** Ejemplo de uso ***************************************** */
  /* 
  
  logout() {
    this.authService.logout()
    .then((response) => {
      if (response?.data?.success === 1){
        this.authService.navigateByUrl('/login'); // Redirigir a la página de inicio de sesión
      }else{
        this.authService.showAlert(
          'Su token de acceso ya no es valido, por favor inicie sesión nuevamente.'
        );
      }
    })
    .catch(e => {
      this.authService.showAlert(e?.error?.message);
    });
  }
  
  */
  /* ***************************************** Fin del ejemplo **************************************** */

  /**
   * Obtiene el perfil del usuario autenticado.
   *
   * Este método realiza una solicitud HTTP GET al endpoint de perfil de usuario
   * utilizando un token de autenticación obtenido previamente.
   *
   * @returns {Promise<any>} Una promesa que se resuelve con la respuesta de la solicitud HTTP.
   * @throws {Error} Si ocurre un error durante la solicitud HTTP.
   */
  async perfil() {
    // Token de autenticación
    const token = await this.obtenerToken();

    const options = {
      url: environment.serverUrl + 'auth/profile',
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

  /* ***************************************** Ejemplo de uso ***************************************** */
  /* 
  
  getPerfil() {
    this.authService.perfil()
    .then((response) => {
      if (response?.data?.success === 1){
        this.perfil = response.data;
      }else{
        this.authService.showAlert(
          'Su token de acceso ya no es valido, por favor inicie sesión nuevamente.'
        );
      }
    })
    .catch(e => {
      this.authService.showAlert(e?.error?.message);
    });
  }

  */
  /* ***************************************** Fin del ejemplo **************************************** */

  /**
   * Muestra una alerta con un mensaje específico.
   *
   * @param {string} message - El mensaje que se mostrará en la alerta.
   * @returns {Promise<void>} Una promesa que se resuelve cuando la alerta se ha presentado.
   */
  async showAlert(message: string) {
    const alert = await this.#alertCtrl.create({
      header: 'Error de Autenticacion',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  /* 
  async showAlert(message: string) {
    const alert = await this.#alertCtrl.create({
      header: 'Errror de autenticación',
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.#authService.navigateByUrl('/login');
          },
        },
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }
  */

  /**
   * Navega a la URL especificada reemplazando la URL actual en el historial del navegador.
   *
   * @param url - La URL a la que se desea navegar.
   */
  navigateByUrl(url: string) {
    this.#router.navigateByUrl(url, { replaceUrl: true });
  }
}
