import { Component, inject } from '@angular/core';
import type { MenuOption } from '../../../interfaces/menu-option.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from '../../../services/gifs.service';

@Component({
  selector: 'gifs-side-menu-options',
  templateUrl: './side-menu-options.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
  ]
})
export class SideMenuOptionsComponent {

  public gifsService: GifsService = inject(GifsService);
  public menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search',
    }
  ];

}
