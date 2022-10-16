import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  readonly title = 'Bloomreach Assignment 2';
  private subs = new Subscription();

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.subs.add(this.githubService.selectedCommit$.subscribe((commit) => {
      console.log(commit);
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
