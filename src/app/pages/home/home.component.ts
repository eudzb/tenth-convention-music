import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private stopSubscription$ = new Subject();
  playlists: any;

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
        this.playlists = playlists;
        console.warn(playlists);
      })
  }
}
