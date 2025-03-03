import { Component, input, InputSignal } from '@angular/core';
import { GifsListItemComponent } from "./gifs-list-item/gifs-list-item.component";

@Component({
  selector: 'gifs-list',
  templateUrl: './gifs-list.component.html',
  imports: [
    GifsListItemComponent,
  ],
})
export class GifsListComponent {

  public gifs: InputSignal<string[]> = input.required<string[]>();

}
