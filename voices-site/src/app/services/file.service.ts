import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { LangService } from './lang.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private readonly _afStorage: AngularFireStorage,
    private readonly _langService: LangService) { }

  public GetUrlOfLocalized(path: string): Promise<string> {
    if (this._langService.currentLangDefined) {
      let ref = this._afStorage.ref("/locale/" +
        this._langService.currentLangId + "/" + path);
      return ref.getDownloadURL().toPromise<string>();
    }
    return new Promise<string>((resolve, reject) => {
      var subscription = this._langService.OnLangPopulated.subscribe(() => {
        subscription.unsubscribe();
        let ref = this._afStorage.ref("/locale/" +
          this._langService.currentLangId + "/" + path);
        return ref.getDownloadURL().toPromise<string>()
          .then(v => resolve(v), err => reject(err));
      });
    });
  }
}
