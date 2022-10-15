import { Component, Input, OnInit } from '@angular/core';
import { GithubCommit } from 'src/app/services/github.service';

@Component({
  selector: 'app-commit-list-item',
  templateUrl: './commit-list-item.component.html',
})
export class CommitListItemComponent implements OnInit {
  @Input() commit!: GithubCommit;

  constructor() {}

  ngOnInit(): void {}
}
