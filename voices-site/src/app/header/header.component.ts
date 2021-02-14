import { Component, OnInit } from '@angular/core';
import { Direction } from '../social/social.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public Direction = Direction;

  constructor() { }

  ngOnInit(): void {
  }

}
