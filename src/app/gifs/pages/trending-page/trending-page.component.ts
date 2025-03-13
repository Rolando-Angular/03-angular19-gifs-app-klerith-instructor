import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gif-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {

  public gifsService: GifsService = inject(GifsService);
  public scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

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

    if (isAtBottom) {
      // TODO: Cargar la siguiente pagina de gifs
    }
  }

}
