import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GITHUB_BASE_URL, GITHUB_VSCODE_REPO } from '../constants/constants';
import { TestUtils } from '../utils/test-utils';

import { GithubCommit, GithubService } from './github.service';

describe('GithubService', () => {
  const dummyISODate = '2022-10-15T06:27:26Z';
  const dummyRepoName = 'test/repo';
  let service: GithubService;
  let httpController: HttpTestingController;

  const dummyCommitArray: GithubCommit[] = [TestUtils.createGithubCommit()];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GithubService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getCommits and return an array of Commits with default repo', () => {
    service.getCommits(dummyISODate).subscribe((res) => {
      expect(res).toEqual(dummyCommitArray);
    });

    const req = httpController.expectOne((req) => {
      return req.urlWithParams.startsWith(
        `${GITHUB_BASE_URL}/repos/${GITHUB_VSCODE_REPO}/commits?since=`
      );
    });

    req.flush(dummyCommitArray);
  });

  it('should call getCommits and return an array of Commits with provided repo', () => {
    service.getCommits(dummyISODate, dummyRepoName).subscribe((res) => {
      expect(res).toEqual(dummyCommitArray);
    });

    const req = httpController.expectOne((req) => {
      return req.urlWithParams.startsWith(
        `${GITHUB_BASE_URL}/repos/${dummyRepoName}/commits?since=`
      );
    });

    req.flush(dummyCommitArray);
  });

  it('should call getCommits and return an array of commits with provided repo and since date', () => {
    service.getCommits(dummyISODate, dummyRepoName).subscribe((res) => {
      expect(res).toEqual(dummyCommitArray);
    });

    const req = httpController.expectOne((req) => {
      return req.urlWithParams.endsWith(
        `${GITHUB_BASE_URL}/repos/${dummyRepoName}/commits?since=${dummyISODate}`
      );
    });

    req.flush(dummyCommitArray);
  });
});
