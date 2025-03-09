import { Component, input } from '@angular/core';
import { GifsListItemComponent } from "./gifs-list-item/gifs-list-item.component";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-list',
  templateUrl: './gifs-list.component.html',
  imports: [
    GifsListItemComponent,
  ],
})
export class GifsListComponent {

  public gifs = input.required<Gif[]>();

}
