import { AngularFirestore } from '@angular/fire/firestore';
import { LangService } from './lang.service';

export abstract class BaseLocalizedStoreService {

  private _objectPromises: Map<string, Promise<any | undefined>> =
    new Map<string, Promise<any | undefined>>();

  constructor(
    private readonly _langService: LangService,
    private readonly _store: AngularFirestore) { }

  protected load<T>(collection: string): Promise<T | undefined> {
    if (this._objectPromises.has(collection))
      return this.get(collection);
    if (this._langService.currentLangDefined) {
      this._objectPromises.set(collection, this.getObjectPromise(collection));
      return this.get(collection);
    }
    this._objectPromises.set(collection,
      new Promise<T | undefined>((resolve, reject) => {
        var subscription = this._langService.OnLangPopulated.subscribe(v => {
          subscription.unsubscribe();
          this.getObjectPromise(collection).then(
            res => resolve(<T>res), error => reject(error))
        })
      }));
    return this.get(collection);
  }

  private get<T>(collection: string): Promise<T | undefined> {
    return <Promise<T | undefined>>this._objectPromises.get(collection);
  }

  private getObjectPromise<T>(collection: string): Promise<T | undefined> {
    var locale = <string>this._langService.currentLangId;
    return new Promise<T | undefined>((resolve, reject) =>
      this._store.collection(locale).doc<T>(collection).get()
        .subscribe(doc => {
          if (!doc.exists) {
            console.warn(`No ${collection} record for the '${locale}' locale.`);
            resolve(<any>null as T);
            return;
          }
          resolve(doc.data());
        }, error => {
          console.error(error);
          reject(error);
        }));
  }
}
