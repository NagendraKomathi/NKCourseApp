import { Injectable } from "@angular/core";
import { CanDeactivate, Router } from "@angular/router";
import { NavMenuService } from "../nav-menu/nav-menu.service";
import { TestMainTemplateComponent } from "../test-main-template/test-main-template.component";


@Injectable()

export class PreventUnsaveChanges implements CanDeactivate<TestMainTemplateComponent> {
  PageBackCount: number = 0;
  username!: string | null;

  constructor(public router: Router) { }

  canDeactivate(component: TestMainTemplateComponent) {
    this.PageBackCount = this.PageBackCount++;
    this.username = localStorage.getItem("username");

    //if (component.isPageLoad) {
    //  this.router.navigate(["dashboard"]);
    //  return false;
    //}

    if (this.username == null) { return true; }
    if (component.seconds != 0) {
      if (this.PageBackCount == 3) {
        alert("You have switch the tab multiple time, Please contact with your administrator");
        return true;
      } else {
        alert("Do not switch the tab");
        return false;
      }
    } else {
      this.router.navigate(["dashboard"]);
      return false;
    }
    
    
  }
}
