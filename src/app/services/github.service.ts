import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  GITHUB_BASE_URL,
  GITHUB_REPO_VSCODE,
  ITEMS_PER_PAGE,
} from '../constants/constants';

export interface GithubCommit {
  sha: string;
  commit: {
    message: string;
    committer: {
      name: string;
      email: string;
      date: Date;
    };
    author: {
      name: string;
      email: string;
      date: Date;
    };
    url: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private _selectedCommit = new BehaviorSubject<GithubCommit | null>(null);
  readonly selectedCommit$ = this._selectedCommit.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Gets a list of commits from given repo.
   *
   * @param repo - the repo to query for commits
   * @param since - ISO timestamp since when to query
   * @returns - observable representing the list of commits
   */
  fetchCommits(
    since: string,
    page = 1,
    repo = GITHUB_REPO_VSCODE
  ): Observable<GithubCommit[]> {
    return this.http.get<GithubCommit[]>(
      `${GITHUB_BASE_URL}/repos/${repo}/commits`,
      {
        params: {
          since,
          page,
          per_page: ITEMS_PER_PAGE,
        },
      }
    );
  }

  selectCommit(commit: GithubCommit | null): void {
    this._selectedCommit.next(commit && Object.assign({}, commit));
  }
}
