import { OnInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettingsService } from './services/app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
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
}