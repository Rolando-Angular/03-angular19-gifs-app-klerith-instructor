import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";

@Component({
  selector: 'app-gifs-history',
  templateUrl: './gifs-history.component.html',
  imports: [GifsListComponent],
})
export default class GifsHistoryComponent {

  public gifsService: GifsService = inject(GifsService);
  public query = toSignal<string>(inject(ActivatedRoute).params
    .pipe(
      map((params) => params['query'])
    ));
  public gifsByKey = computed(() => {
    const query = this.query() ?? '';
    return this.gifsService.getHistoryGifs(query);
  });

}
