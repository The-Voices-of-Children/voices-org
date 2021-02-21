import { Component, OnInit } from '@angular/core';
import { Lang, LangService } from '../services/lang.service';

@Component({
  selector: 'app-lang-select',
  templateUrl: './lang-select.component.html',
  styleUrls: ['./lang-select.component.scss']
})
export class LangSelectComponent implements OnInit {

  constructor(private readonly _langService: LangService) { }

  ngOnInit(): void {
  }

  public get langs() {
    return this._langService.availableLangs;
  }

  public langUrl(langId: string) {
    return "/" + langId;
  }

  public get currentLang(): string {
    return this._langService.currentLang.id;
  }

  public set currentLang(val: string) {
    window.open(this.langUrl(val),"_self");
  }

}