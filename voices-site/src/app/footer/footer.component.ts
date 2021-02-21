import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { AppSettingsService, SocialRefs } from '../services/app-settings.service';
import { FileService } from '../services/file.service';
import { Direction } from '../social/social.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public Direction = Direction;
  private _logoSrc: string = "";
  public socialRefs: SocialRefs | undefined;

  constructor(
    private readonly _fileService: FileService,
    private readonly _appSettingsService: AppSettingsService) { }

  ngOnInit(): void {
    this._fileService.GetUrlOfLocalized("logo.png").then(res => {
      this._logoSrc = res;
    }, error => {
      throw "Could not load logo URL. " + error;
    });
    this._appSettingsService.loadSocialRefs().then(res => {
      this.socialRefs = res;
    }, error => {
      throw "Could not load contacts. " + error;
    });
  }

  public get logoSrc() {
    return this._logoSrc;
  }

  public get address(): string {
    if (this.socialRefs == undefined) return "";
    return this.socialRefs.address.replace("\\n", "<br/>");
  }

}
