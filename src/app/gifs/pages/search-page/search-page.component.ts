import { Component, inject, OnDestroy, signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';
import type { Gif } from '../../interfaces/gif.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'gif-search-page',
  templateUrl: './search-page.component.html',
  imports: [GifsListComponent],
})
export default class SearchPageComponent implements OnDestroy {

  public gifsService: GifsService = inject(GifsService);
  public gifs = signal<Gif[]>([]);
  public dropSubscribe$ = new Subject<void>();

  public onSearch(query: string): void {
    this.gifsService.searchGifs(query)
      .pipe(
        takeUntil(this.dropSubscribe$)
      )
      .subscribe((gifs) => {
        this.gifs.set(gifs);
      });
  }

  public ngOnDestroy(): void {
    this.dropSubscribe$.next();
    this.dropSubscribe$.complete();
  }

}
