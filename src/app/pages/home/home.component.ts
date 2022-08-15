import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Playlist} from '../../models/Playlist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private stopSubscription$ = new Subject();
  playlists: Playlist[];

  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    this.getPlaylist();
  }

  ngOnDestroy() {
    this.stopSubscription$.next();
    this.stopSubscription$.complete();
  }

  private getPlaylist() {
    this.spotifyService.getPlaylist('1n9UO9ZN0sSCnW2WRZAtL1')
      .pipe(takeUntil(this.stopSubscription$))
      .subscribe(playlists => {
        console.warn(playlists);
      })
  }
}
