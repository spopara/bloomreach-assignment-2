import { GithubCommit } from '../services/github.service';

export class TestUtils {
  /**
   * Creates a dummy object for testing.
   *
   * @param date - date to override default
   * @param message - message to override default
   * @returns - dummy object
   */
  static createGithubCommit(
    date = new Date('2022-10-15T06:27:26Z'),
    message = 'Some message'
  ): GithubCommit {
    const defaultCommit: GithubCommit = {
      sha: '641046a11d2d30ffb552e4047b61026efd1179ab',
      commit: {
        url: 'https://api.github.com/repos/microsoft/vscode/git/trees/e5572d91d044783e8ae7689e60d5d0c2022aed3c',
        message,
        author: {
          name: 'Some Name',
          email: 'name.surname@mail.com',
          date,
        },
        committer: {
          name: 'Some Name',
          email: 'name.surname@mail.com',
          date,
        },
      },
    };

    return defaultCommit;
  }
}
