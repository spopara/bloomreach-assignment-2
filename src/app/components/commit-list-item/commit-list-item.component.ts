import { Component, Input, OnInit } from '@angular/core';
import { GithubCommit, GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-commit-list-item',
  templateUrl: './commit-list-item.component.html',
})
export class CommitListItemComponent implements OnInit {
  @Input() commit!: GithubCommit;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {}

  handleClick(): void {
    this.githubService.selectCommit(this.commit);
  }
}
