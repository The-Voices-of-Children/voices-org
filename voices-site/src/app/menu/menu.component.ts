import { Component, HostListener, OnInit } from '@angular/core';
import { MenuOption, MenuService } from '../services/menu.service';
import { Direction } from '../social/social.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public Direction = Direction;

  private _menuOpened: boolean = false;

  constructor(private readonly _menuService: MenuService) { }

  ngOnInit(): void {
  }

  public get options(): MenuOption[] {
    return this._menuService.menuOptions;
  }

  public get menuOpened(): boolean {
    return this._menuOpened;
  }

  public switchMenu() {
    this._menuOpened = !this._menuOpened;
  }

  public showMenu() {
    this._menuOpened = true;
  }

  public hideMenu() {
    this._menuOpened = false;
  }

  @HostListener('document:scroll')
  @HostListener('document:click')
  public clickout() {
    this._menuOpened = false;
  }

  public openedItemClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
