import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GithubCommit, GithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly subs = new Subscription();
  readonly title = 'Bloomreach Assignment 2';
  selectedCommit: GithubCommit | null | undefined;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.subs.add(
      this.githubService.selectedCommit$.subscribe((commit) => {
        this.selectedCommit = commit;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
