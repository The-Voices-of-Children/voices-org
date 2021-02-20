import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { Direction } from '../social/social.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public Direction = Direction;
  private _logoSrc: string = "";

  constructor(private readonly _fileService: FileService) { }

  ngOnInit(): void {
    this._fileService.GetUrlOfLocalized("header_logo.png").then(res => {
      this._logoSrc = res;
    }, err => {
      throw "Could not load logo URL."
    });
  }

  public get logoSrc() {
    return this._logoSrc;
  }

}
