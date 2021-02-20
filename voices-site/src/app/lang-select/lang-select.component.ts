import { Component, OnInit } from '@angular/core';
import { LangService } from '../services/lang.service';

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
    return window.location.hostname + "/" + langId;
  }

  public get langName() {
    return this._langService.currentLang.name;
  }

}