import { LOCALE_ID, Inject, Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  private _currentLang: string | undefined;

  private _langChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _availableLangs: Lang[] = [
    new Lang("uk", "Українська"),
    new Lang("en", "English")
  ];

  constructor(@Inject(LOCALE_ID) private _defaultLang: string) {
  }

  public get currentLangDefined(): boolean {
    return this._currentLang != undefined;
  }

  public get OnLangPopulated(): EventEmitter<boolean> {
    return this._langChange;
  }

  public setCurrentLangId(langId: string) {
    if (this.currentLangDefined) {
      throw `Can not set current language to '${langId}',`
      + ` it already has been set. Current language is '${this._currentLang}'`;
    }
    if (this._availableLangs.filter(l => l.id == langId).length == null) {
      throw `Language '${langId}' is not supported.`;
    }
    this._currentLang = langId;
    this._langChange.emit(true);
  }

  public get currentLang(): Lang {
    var lang = this._availableLangs.find(l => l.id == this.currentLangId);
    if (lang == undefined) {
      throw `Language '${this.currentLangId}' is not supported!`;
    }
    return lang;
  }

  public get availableLangs(): Lang[] {
    return this._availableLangs.map(i => i);
  }

  public get currentLangId() {
    if (!this.currentLangDefined) {
      return this._defaultLang;
    }
    return this._currentLang;
  }
}

export class Lang {
  private readonly _name: string;
  private readonly _id: string;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }
}
