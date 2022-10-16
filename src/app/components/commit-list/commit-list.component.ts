import { Component, OnInit } from '@angular/core';
import { GITHUB_VSCODE_REPO as GITHUB_REPO_VSCODE } from 'src/app/constants/constants';
import { GithubCommit, GithubService } from 'src/app/services/github.service';
import { DateUtils } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
})
export class CommitListComponent implements OnInit {
  currentDate = DateUtils.createDateWithoutTime(new Date());
  selectedDate = DateUtils.createDateWithoutTime(
    DateUtils.getFirstDayOfCurrentMonth()
  );
  repo = GITHUB_REPO_VSCODE;
  commits: GithubCommit[] = [];

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.fetchCommits(this.selectedDate);
  }

  onDateChanged(event: EventTarget | null): void {
    this.selectedDate = (event as HTMLInputElement).value;
    this.fetchCommits(this.selectedDate);
  }

  fetchCommits(since: string): void {
    this.githubService
      .getCommits(
        DateUtils.createDateWithTime(since),
        GITHUB_REPO_VSCODE
      )
      .subscribe((commits) => {
        this.commits = commits.sort((a, b) => {
          return (
            new Date(b.commit.committer.date).getTime() -
            new Date(a.commit.committer.date).getTime()
          );
        });
      });
  }
}
