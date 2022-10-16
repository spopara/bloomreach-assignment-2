import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GithubCommit, GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-commit-details',
  templateUrl: './commit-details.component.html',
  styleUrls: ['./commit-details.component.scss'],
})
export class CommitDetailsComponent implements OnInit {
  private subs = new Subscription();
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
