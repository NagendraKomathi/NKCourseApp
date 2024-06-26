import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavMenuService {
  visible!: boolean;
  constructor() {
    this.visible = true;
  }
  hide() { this.visible = false; }

  show() { this.visible = true; }

}
