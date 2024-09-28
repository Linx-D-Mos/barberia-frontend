import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network/network.service';
import { IonIcon, IonLabel } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { cloudOfflineOutline, cloudOutline } from 'ionicons/icons';

@Component({
  selector: 'app-no-internet-banner',
  templateUrl: './no-internet-banner.component.html',
  styleUrls: ['./no-internet-banner.component.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon,  CommonModule ]
})
export class NoInternetBannerComponent {

  networkService = inject(NetworkService);

  showInternetBanner: boolean = false;
  
  constructor() {
    addIcons({ cloudOfflineOutline, cloudOutline });

    this.networkService.checkNetworkStatus().then((status) => {
      if (status.connected) {
        this.showInternetBanner = true;
        setTimeout(() => {
          this.showInternetBanner = false;
        }, 6000);
      }
    });
  }

}
