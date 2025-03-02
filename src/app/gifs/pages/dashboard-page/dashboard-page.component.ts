import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  selector: 'gif-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  imports: [
    RouterOutlet,
    SideMenuComponent,
  ]
})
export default class DashboardPageComponent {

}
