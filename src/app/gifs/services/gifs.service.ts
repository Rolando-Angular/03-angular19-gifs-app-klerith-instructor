import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, Observable, tap } from "rxjs";
import type { GiphyResponse } from "../interfaces/giphy.interface";

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  public trendingGifs = signal<Gif[]>([]);
  public trendingGifsLoading = signal(true);
  public searchHistory = signal<Record<string, Gif[]>>({});
  public searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  private httpClient = inject(HttpClient);

  constructor() {
    this.loadTrendingGifs();
  }

  public loadTrendingGifs(): void {
    this.httpClient.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        'api_key': environment.giphyApikey,
        'limit': 20,
        'offset': 0,
      }
    }).subscribe((resp) => {
      const gifs: Gif[] = GifMapper.mapToGiphy(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    });
  }

  public searchGifs(query: string): Observable<Gif[]> {
    return this.httpClient.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        'api_key': environment.giphyApikey,
        'q': query,
        'limit': 10,
        'offset': 0,
      }
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapToGiphy(items)),
      tap((gifs) => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: gifs,
        }));
      }),
    );
  }

  public getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
