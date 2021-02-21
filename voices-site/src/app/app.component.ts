import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettingsService } from './services/app-settings.service';
import { LangService } from './services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('currentLang')
  public langElement: ElementRef | undefined;

  constructor(
    private readonly _langService: LangService,
    private readonly _appSettingsService: AppSettingsService,
    private readonly _title: Title) { }

  ngOnInit(): void {
    this._appSettingsService.loadMeta().then(
      res => {
        if (res?.title != undefined) {
          this._title.setTitle(res?.title)
        }
      }, error => { throw "Could not load meta." });
  }

  ngAfterViewInit() {
    if (this.langElement == undefined) {
      throw "Could not detect current language. No currentLang element.";
    }
    var currentLang = this.langElement.nativeElement.innerText;
    this._langService.setCurrentLangId(currentLang);
  }
}