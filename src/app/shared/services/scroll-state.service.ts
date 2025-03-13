import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ScrollStateService {

  private trendingScrollState = signal(0);


  public get scrollState(): number {
    return this.trendingScrollState();
  }

  public set scrollState(pos: number) {
    this.trendingScrollState.set(pos);
  }

}
