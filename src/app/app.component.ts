import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform, IonLabel } from '@ionic/angular/standalone';
import { NetworkService } from './services/network/network.service';
import { NoInternetBannerComponent } from './components/no-internet-banner/no-internet-banner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonLabel, IonApp, IonRouterOutlet, NoInternetBannerComponent, CommonModule],
})
export class AppComponent {

  isConnected = true;
  
  constructor(
    private networkService: NetworkService,
    private platform: Platform
  ) {
    this.initializeApp();
    this.networkService.getNetworkStatus().subscribe(
      isConnected => {
        this.isConnected = isConnected;
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.networkService.checkNetworkStatus();
      
      this.platform.resume.subscribe(() => {
        this.networkService.checkNetworkStatus();
      });
    });
  }
}
