import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NetworkService } from 'src/app/services/network/network.service';

@Component({
  selector: 'app-no-internet-banner',
  templateUrl: './no-internet-banner.component.html',
  styleUrls: ['./no-internet-banner.component.scss'],
  standalone: true,
  imports: [ CommonModule ]
})
export class NoInternetBannerComponent  implements OnInit {

  isConnected = true;
  private networkStatusSubscription: Subscription = new Subscription();

  networkService = inject(NetworkService);
  
  constructor() {}

  ngOnInit() {
    this.networkStatusSubscription = this.networkService.getNetworkStatus().subscribe(
      isConnected => {
        this.isConnected = isConnected;
      }
    );
  }
}
