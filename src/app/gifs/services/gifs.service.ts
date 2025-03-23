import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import type { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, Observable, tap } from "rxjs";
import type { GiphyResponse } from "../interfaces/giphy.interface";

type HistoryGif = Record<string, Gif[]>;
const GIFS_SEARCH: string = 'gifs-search';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  public trendingGifs = signal<Gif[]>([]);
  public trendingGifsLoading = signal(false);
  public trendingGifGroup = computed<Array<Array<Gif>>>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  });
  public searchHistory = signal<HistoryGif>(
    this.loadSearchHistory()
  );
  public searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  private trendingPage = signal(0);

  private httpClient = inject(HttpClient);

  public saveGifsToLocalStorage = effect(() => {
    localStorage.setItem(GIFS_SEARCH, JSON.stringify(this.searchHistory()));
  });

  constructor() {
    this.loadTrendingGifs();
  }

  public loadTrendingGifs(): void {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.httpClient.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        'api_key': environment.giphyApikey,
        'limit': 24,
        'offset': this.trendingPage() * 20,
      }
    }).subscribe((resp) => {
      const gifs: Gif[] = GifMapper.mapToGiphy(resp.data);
      this.trendingGifs.update((trendingGifs) => [...trendingGifs, ...gifs]);
      this.trendingGifsLoading.set(false);
      this.trendingPage.update((page) => page + 1);
    });
  }

  public searchGifs(query: string): Observable<Gif[]> {
    return this.httpClient.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        'api_key': environment.giphyApikey,
        'q': query,
        'limit': 6,
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

  private loadSearchHistory(): HistoryGif {
    const searchHistoryStorage: HistoryGif = JSON.parse(localStorage.getItem(GIFS_SEARCH) ?? '{}');
    return searchHistoryStorage;
  }

}
