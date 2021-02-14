import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private _locale: string = "uk";

  private _socialPromise: Promise<SocialRefs|undefined> | undefined;

  constructor(private _store: AngularFirestore) {}

  public loadSocialRefs(): Promise<SocialRefs|undefined> {
    if (this._socialPromise) return this._socialPromise;
    this._socialPromise = new Promise<SocialRefs|undefined>((resolve, reject) =>
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
    return this._socialPromise;
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
