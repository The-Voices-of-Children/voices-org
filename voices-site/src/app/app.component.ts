import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { LangService } from './services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('currentLang') 
  public langElement:ElementRef | undefined;

  constructor(private _langService: LangService) {}

  ngAfterViewInit() {
    if (this.langElement == undefined) {
      throw "Could not detect current language. No currentLang element.";
    }
    var currentLang = this.langElement.nativeElement.innerText;
    this._langService.setCurrentLangId(currentLang);
  }
}