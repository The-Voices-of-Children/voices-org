import { Injectable } from '@angular/core';
import { AppSettingsService, SocialRefs } from 'src/app/services/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private _socialRefs: SocialRefs | undefined;
  private _socialPromise: Promise<SocialRefs| undefined> | undefined;

  constructor(private _appSettings: AppSettingsService) { }

  public get socialRefs(): SocialRefs | undefined {
    if (this._socialRefs) return this._socialRefs;
    this.loadSocialRefs();
    return undefined;
  }

  public loadSocialRefs(): Promise<SocialRefs| undefined> {
    if (this._socialPromise) return this._socialPromise;
    this._socialPromise = new Promise((resolve, reject) => 
        this._appSettings.loadSocialRefs()
        .then(res => {
          this._socialRefs = res;
          resolve(this._socialRefs);
        },
        err => reject(err)));
    return this._socialPromise;
  }

  private get selfHost(): string {
    return window.location.href;
  }

  public get facebookShareUrl(): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.selfHost)};src=sdkpreparse`
  }
}