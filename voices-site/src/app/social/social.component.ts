import { Component, OnInit, Input } from '@angular/core';
import { SocialService } from './social.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  @Input()
  public direction: Direction = Direction.vertical;

  @Input()
  public size: string = '40px';

  private _socialButtons: SocialButtonConfig[] = [];

  constructor(
    private socialService: SocialService) { }

  ngOnInit() {
    this.socialService.loadSocialRefs().then(() => {
      this._socialButtons = this.simpleLinkButtons.filter(el => el.url());
    });
  }

  private get simpleLinkButtons(): SocialButtonConfig[] {
    return [
      {
        url: () => this.socialService.socialRefs?.facebook,
        className: "facebook",
        imagePath: "assets/facebook.svg"
      },
      {
        url: () => this.socialService.socialRefs?.instagram,
        className: "instagram",
        imagePath: "assets/instagram.svg"
      },
      {
        url: () => this.socialService.socialRefs?.youtube,
        className: "youtube",
        imagePath: "assets/youtube.svg"
      }
    ];
  }

  public get flexDirection(): string {
    return this.direction === Direction.horizontal ? 'row' : 'column';
  }

  public get socialButtons(): SocialButtonConfig[] {
    return this._socialButtons;
  }

  public goToLink(link: string|undefined) {
    window.open(link, '_blank');
  }
}

interface SocialButtonConfig {
  url: () => string|undefined;
  className: string;
  imagePath: string;
}

export enum Direction {
  vertical = "vertical",
  horizontal = "horizontal"
}
