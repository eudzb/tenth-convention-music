import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotifyUrl: string = environment.spotify_api_url;

  constructor(
    private http: HttpClient
  ) {
  }

  getPlaylist(playlistId: string) {
    const url = `${this.spotifyUrl}/playlists/${playlistId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.oath_token}`
    });
    return this.http.get(url, {headers});
  }
}
