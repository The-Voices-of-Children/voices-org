import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  public static readonly consentConfirmedCookieName: string = "consent-confirmed";

  constructor(
    private readonly _angularAnalytics: AngularFireAnalytics,
    private readonly _cookieService: CookieService) {
  }

  public enableAnalytics() {
    this.enableAnalyticsAndReload();
    this.consentConfirmed = true;
  }

  public disableAnalytics() {
    this._angularAnalytics.setAnalyticsCollectionEnabled(false);
    this.consentConfirmed = false;
  }

  public get showConsentPopupOnAppStart(): boolean {
    return this.consentConfirmed == undefined;
  }

  private enableAnalyticsAndReload() {
    this._angularAnalytics.setAnalyticsCollectionEnabled(true);
    location.reload();
  }

  private get consentConfirmed(): boolean | undefined {
    var val = this._cookieService.get(AnalyticsService.consentConfirmedCookieName);
    if (val == true.toString()) {
      return true;
    }
    if (val == false.toString()) {
      return false;
    }
    return undefined;
  }

  private set consentConfirmed(val: boolean | undefined) {
    if (val == undefined) {
      throw "Can not set undefined value!";
    }
    this._cookieService.set(AnalyticsService.consentConfirmedCookieName, val.toString());
  }
}
