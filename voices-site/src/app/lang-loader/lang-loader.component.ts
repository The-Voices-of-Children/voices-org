import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-lang-loader',
  templateUrl: './lang-loader.component.html',
  styleUrls: ['./lang-loader.component.scss']
})
export class LangLoaderComponent implements OnInit, AfterViewInit {

  @ViewChild('currentLang')
  public langElement: ElementRef | undefined;

  @ViewChild('translations')
  public translations: ElementRef | undefined;

  constructor(
    private readonly _langService: LangService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initTranslations();
    this.setCurrentLang();
  }

  private setCurrentLang() {
    if (this.langElement == undefined) {
      throw "Could not detect current language. No currentLang element.";
    }
    var currentLang = this.langElement.nativeElement.innerText;
    this._langService.setCurrentLangId(currentLang);
  }

  private initTranslations() {
    if (this.translations == undefined) {
      throw "Could not load translations. No translations element.";
    }
    var translationMap = new Map<string, string>();
    for(var child of this.translations.nativeElement.children) {
      translationMap.set(child.id, child.innerText);
    }
    this._langService.setTranslations(translationMap);
  }
}
