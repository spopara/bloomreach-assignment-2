import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GITHUB_BASE_URL, GITHUB_VSCODE_REPO } from '../constants/constants';

export interface GithubCommit {
  commit: {
    message: string;
    committer: {
      name: string;
      email: string;
      date: Date;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  /**
   * Gets a list of commits from give repo.
   *
   * @param repo - the repo to query for commits
   * @param since - ISO timestamp since when to query
   * @returns - observable representing the list of commits
   */
  getCommits(since: string, repo = GITHUB_VSCODE_REPO) {
    return this.http.get<GithubCommit[]>(
      `${GITHUB_BASE_URL}/repos/${repo}/commits`,
      {
        params: {
          since,
        },
      }
    );
  }
}
