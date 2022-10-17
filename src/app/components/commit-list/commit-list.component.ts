import { Component, OnInit } from '@angular/core';
import {
  GITHUB_REPO_VSCODE,
  ITEMS_PER_PAGE,
} from 'src/app/constants/constants';
import { GithubCommit, GithubService } from 'src/app/services/github.service';
import { DateUtils } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
})
export class CommitListComponent implements OnInit {
  readonly maxDate = DateUtils.createDateWithoutTime(new Date());
  selectedDate = DateUtils.createDateWithoutTime(
    DateUtils.getFirstDayOfCurrentMonth()
  );
  currentPage = 1;
  nextDisabled = false;
  repo = GITHUB_REPO_VSCODE;
  commits: GithubCommit[] = [];

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.getCommits(this.selectedDate, this.currentPage);
  }

  getCommits(since: string, page: number): void {
    this.githubService
      .fetchCommits(
        DateUtils.createDateWithTime(since),
        page,
        GITHUB_REPO_VSCODE
      )
      .subscribe((commits) => {
        this.nextDisabled = commits.length < ITEMS_PER_PAGE;
        this.commits = commits;
      });
  }

  handleDateChanged(event: EventTarget | null): void {
    this.selectedDate = (event as HTMLInputElement).value;
    this.currentPage = 1;
    this.getCommits(this.selectedDate, this.currentPage);
  }

  handlePageChanged(direction: 'next' | 'previous'): void {
    switch (direction) {
      case 'next':
        if (this.nextDisabled) {
          return;
        }
        this.currentPage++;
        break;
      case 'previous':
        if (this.currentPage <= 1) {
          return;
        }
        this.currentPage--;
        break;
    }
    window.scrollTo(0, 0);
    this.getCommits(this.selectedDate, this.currentPage);
  }
}
