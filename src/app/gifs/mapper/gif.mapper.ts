import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interface";

export class GifMapper {

  public static mapToGiphy(data: GiphyItem): Gif;
  public static mapToGiphy(data: GiphyItem[]): Gif[];

  public static mapToGiphy(data: GiphyItem | GiphyItem[]): Gif | Gif[] {
    if (Array.isArray(data)) {
      return data.map(item => {
        return this.mapToGiphy(item)
      });
    }
    return {
      id: data.id,
      title: data.title,
      url: data.images.original.url,
    };
  }

}
