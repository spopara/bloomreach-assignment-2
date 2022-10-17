import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GithubCommit, GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-commit-details',
  templateUrl: './commit-details.component.html',
})
export class CommitDetailsComponent implements OnInit {
  private subs = new Subscription();
  selectedCommit: GithubCommit | null | undefined;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.subs.add(
      this.githubService.selectedCommit$.subscribe((selectedCommit) => {
        this.selectedCommit = selectedCommit;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  handleBackClick(): void {
    this.githubService.selectCommit(null);
  }
}
