import { Component, OnInit } from '@angular/core';
import { GITHUB_VSCODE_REPO as GITHUB_REPO_VSCODE } from 'src/app/constants/constants';
import { GithubCommit, GithubService } from 'src/app/services/github.service';
import { DateUtils } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
})
export class CommitListComponent implements OnInit {
  repo = GITHUB_REPO_VSCODE;
  commits: GithubCommit[] = [];

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.githubService
      .getCommits(
        DateUtils.getFirstDayOfCurrentMonth().toISOString(),
        GITHUB_REPO_VSCODE
      )
      .subscribe((commits) => {
        this.commits = commits.sort((a, b) => {
          return (
            new Date(b.commit.author.date).getTime() -
            new Date(a.commit.author.date).getTime()
          );
        });
      });
  }
}
