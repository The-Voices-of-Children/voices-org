import { Injectable } from '@angular/core';
import { aboutPath, activitiesPath, homePath } from '../app-routing.module';
import { LangService } from './lang.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly _menuOptions: MenuOption[] = [
    new MenuOption("MENU_HOME", homePath),
    new MenuOption("MENU_ACTIVITIES", activitiesPath),
    new MenuOption("MENU_ABOUT", aboutPath),
  ];

  constructor(langService: LangService) {
    var subscription = langService.OnTranslationsPopulated.subscribe(
      () => {
        subscription.unsubscribe();
        this._menuOptions.forEach(opt => {
          opt.translatedVal = langService.translate(opt.translationKey);
        })
      }
    );
  }

  public get menuOptions() {
    return this._menuOptions.filter(m => true);
  }
}

export class MenuOption {
  private readonly _translationKey: string;
  private readonly _relativeUrl: string;

  constructor(translationKey: string, relativeUrl: string) {
    this._relativeUrl = relativeUrl;
    this._translationKey = translationKey;
    this.translatedVal = translationKey;
  }

  public translatedVal: string;

  public get translationKey(): string {
    return this._translationKey;
  }

  public get relativeUrl(): string {
    return this._relativeUrl;
  }
}
