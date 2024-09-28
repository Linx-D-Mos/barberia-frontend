import { computed, Injectable, signal } from '@angular/core';
import { PluginListenerHandle } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';
import { NetworkStatus } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})

export class NetworkService {
  #connection = signal<NetworkStatus>({
    connected: true,
  });

  public connected = computed(() => this.#connection().connected);
  
  constructor() {
    this.initializeNetworkListener();
  }

  private async initializeNetworkListener() {
    // Verificar el estado inicial
    await this.checkNetworkStatus();

    // Configurar el listener para cambios futuros
    await Network.addListener(
      'networkStatusChange',
      (status) => {
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

  public async checkNetworkStatus() {
    const status = await Network.getStatus();
    if (!status.connected) {
      this.#connection.set({
        connected: false,
      });
    }else {
      this.#connection.set({
        connected: true,
      });
    }

    return status;
  }
}
