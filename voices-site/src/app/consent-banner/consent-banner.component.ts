import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-consent-banner',
  templateUrl: './consent-banner.component.html',
  styleUrls: ['./consent-banner.component.scss']
})
export class ConsentBannerComponent implements OnInit {

  public isHidden: boolean;

  constructor(private readonly _analyticsService: AnalyticsService) { 
    this.isHidden = !_analyticsService.showConsentPopupOnAppStart;
  }

  ngOnInit(): void {
  }

  public allowClick() {
    this._analyticsService.enableAnalytics();
    this.isHidden = true;
  }

  public denyClick() {
    this._analyticsService.disableAnalytics();
    this.isHidden = true;
  }
}
