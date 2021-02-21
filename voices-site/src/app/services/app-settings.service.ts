import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LangService } from './lang.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private _locale: string = "";

  private _socialPromise: Promise<SocialRefs | undefined> | undefined;

  constructor(
    private readonly _langService: LangService,
    private readonly _store: AngularFirestore) { }

  public loadSocialRefs(): Promise<SocialRefs | undefined> {
    if (this._socialPromise) return this._socialPromise;
    if (this._langService.currentLangDefined) {
      this._locale = <string>this._langService.currentLangId;
      this._socialPromise = this.getSocialRefsPromise();
      return this._socialPromise;
    }
    this._socialPromise = new Promise<SocialRefs | undefined>((resolve, reject) => {
      var subscription = this._langService.OnLangPopulated.subscribe(v => {
        subscription.unsubscribe();
        this._locale = <string>this._langService.currentLangId;
        this.getSocialRefsPromise().then(res => resolve(res), error => reject(error))
      })
    });
    return this._socialPromise;
  }

  private getSocialRefsPromise(): Promise<SocialRefs | undefined> {
    return new Promise<SocialRefs | undefined>((resolve, reject) =>
      this._store.collection(this._locale).doc<SocialRefs>("contacts").get()
        .subscribe(doc => {
          if (!doc.exists) {
            console.warn(`No contacts record for the '${this._locale}' locale.`);
            resolve(<any>null as SocialRefs);
            return;
          }
          resolve(doc.data());
        }, error => {
          console.error(error);
          reject(error);
        }));
  }
}

export interface SocialRefs {
  phone_numbers: string[],
  emails: string[],
  address: string,
  facebook: string,
  youtube: string,
  instagram: string
}
