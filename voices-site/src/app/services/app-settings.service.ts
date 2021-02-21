import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BaseLocalizedStoreService } from './base-localized-store.service';
import { LangService } from './lang.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService extends BaseLocalizedStoreService{

  constructor(
    _langService: LangService,
    _store: AngularFirestore) { 
      super(_langService, _store)
    }

    public loadSocialRefs() : Promise<SocialRefs| undefined> {
      return this.load<SocialRefs>("contacts");
    }

    public loadMeta() : Promise<Meta| undefined> {
      return this.load<Meta>("meta");
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

export interface Meta {
  title: string;
}
