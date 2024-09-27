import { inject, Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  #authService = inject(AuthService);

  /**
   * Sube una foto al servidor.
   *
   * @param {string} base64Image - La imagen en formato base64 que se va a subir.
   * @returns {Promise<any>} - Una promesa que se resuelve con la respuesta del servidor.
   * @throws {Error} - Lanza un error si la solicitud de subida falla.
   */
  async uploadPhoto(base64Image: string) {
    const formData = new FormData();

    // Convertir la imagen base64 a un blob
    const blob = this.#base64toBlob(base64Image, 'image/jpeg');

    // Agregar la imagen al formData
    formData.append('photo', blob, 'image.jpg');

    // Obtener el token de autenticación
    const token = await this.#authService.obtenerToken();

    const options = {
      url: environment.serverUrl + 'photo/upload',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };

    try {
      const response = await CapacitorHttp.post(options);

      return response;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Convierte una cadena de datos en base64 a un objeto Blob.
   *
   * @param base64Data - La cadena de datos en base64 que se desea convertir.
   * @param contentType - El tipo de contenido MIME del Blob resultante.
   * @returns Un objeto Blob que contiene los datos decodificados.
   */
  #base64toBlob(base64Data: string, contentType: string): Blob {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}
