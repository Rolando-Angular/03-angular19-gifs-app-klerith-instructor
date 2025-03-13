import { AfterViewInit, Component, ElementRef, inject, OnDestroy, signal, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'gif-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit, OnDestroy {

  public gifsService: GifsService = inject(GifsService);
  public scrollStateService: ScrollStateService = inject(ScrollStateService);
  public scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  private scrollState = signal(0);

  public onScroll(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    // del total de scroll que tiene el elemento div, cuanto scroll se ha recorrido
    const scrollTop = scrollDiv.scrollTop;
    // total de scroll que tiene el elemento div (altura total del elemento)
    const scrollHeight = scrollDiv.scrollHeight;
    // el total de altura que tiene el viewport de la página
    const clientHeight = scrollDiv.clientHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    // guardando la posicion del scroll temporalmente
    this.scrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifsService.loadTrendingGifs();
    }
  }

  public ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    // asignando valor de scroll guardado en memoria, al elemento div
    scrollDiv.scrollTop = this.scrollStateService.scrollState;
  }

  public ngOnDestroy(): void {
    // almacenando el valor del scroll recoletado en memoria
    this.scrollStateService.scrollState = this.scrollState();
  }

}
