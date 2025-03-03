import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'gifs-list-item',
  templateUrl: './gifs-list-item.component.html',
})
export class GifsListItemComponent {

  public imageUrl: InputSignal<string> = input.required<string>();

}
