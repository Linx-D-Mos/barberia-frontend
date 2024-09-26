import { computed, Injectable, signal } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';
import { NetworkStatus } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para gestionar el estado de la red y la navegación en caso de pérdida de conexión.
 *
 * @class
 * @classdesc Esta clase se encarga de escuchar los cambios en el estado de la red y redirigir
 * la navegación a una página específica cuando no hay conexión a internet.
 *
 * @param {NavController} navCtrl - Controlador de navegación para gestionar las rutas.
 *
 * @method initializeNetworkListener
 * @description Método privado que inicializa el listener para cambios en el estado de la red.
 *
 * @method checkNetworkStatus
 * @description Método público que verifica el estado actual de la red y redirige si no hay conexión.
 */
export class NetworkService {
  private networkStatus = new BehaviorSubject<boolean>(true);
  private networkListener: PluginListenerHandle | null = null;

  #connection = signal<NetworkStatus>({
    connected: true,
  });

  public connected = computed(() => this.#connection().connected);
  constructor() {
    this.initializeNetworkListener();
  }

  private async initializeNetworkListener() {
    // Verificar el estado inicial
    const status = await Network.getStatus();
    this.networkStatus.next(status.connected);
    if (status.connected) {
      this.#connection.set({
        connected: true,
      });
    }else {
      this.#connection.set({
        connected: false,
      });
    }

    // Configurar el listener para cambios futuros
    this.networkListener = await Network.addListener(
      'networkStatusChange',
      (status) => {
        this.networkStatus.next(status.connected);
        if (status.connected) {
          this.#connection.set({
            connected: true,
          });
        } else {
          this.#connection.set({
            connected: false,
          });
        }
      }
    );
  }

  public getNetworkStatus(): Observable<boolean> {
    return this.networkStatus.asObservable();
  }

  public async checkNetworkStatus() {
    const status = await Network.getStatus();
    this.networkStatus.next(status.connected);
    if (!status.connected) {
      this.#connection.set({
        connected: false,
      });
    }else {
      this.#connection.set({
        connected: true,
      });
    }
  }
}
