import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-search-page',
  templateUrl: './search-page.component.html',
  imports: [GifsListComponent],
})
export default class SearchPageComponent {

  public gifsService: GifsService = inject(GifsService);
  public gifs = signal<Gif[]>([]);

  public onSearch(query: string): void {
    this.gifsService.searchGifs(query)
      .subscribe((gifs) => {
        this.gifs.set(gifs);
      });
  }

}
