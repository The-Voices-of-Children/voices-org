import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { LangService } from '../services/lang.service';
import { Direction } from '../social/social.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public Direction = Direction;
  private _logoSrc: string = "";
  private _langSubscription: Subscription | undefined;

  constructor(private readonly _afStorage: AngularFireStorage,
    private readonly _langService: LangService) { }

  ngOnDestroy(): void {
    this._langSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this._langSubscription = this._langService.OnLangPopulated.subscribe(() => {
      let ref = this._afStorage.ref("/locale/" +
      this._langService.currentLangId + "/header_logo.png");
      ref.getDownloadURL().toPromise().then(res => {
        this._logoSrc = res;
      }, err => {
        throw "Could not load logo URL."
      });
    });
  }

  public get logoSrc() {
    return this._logoSrc;
  }

}
