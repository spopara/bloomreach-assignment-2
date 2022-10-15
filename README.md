# Bloomreach Assignment 2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## The Task

Create a simple app that shows a list of commits in a Github repository.
You should use React or Angular.
You can use a CLI to generate the project setup.
You are allowed to use plain css or sass/scss as the style language.
You are allowed to use any UI framework or write your own.
The normal Github API has a limit of 60 requests per hour. If you use authenticated requests
you can remove this limit. To get an authentication token you can go to your Github account
token page.
- __Part 1: Commit overview__
Retrieve all commits of the last month in the git project that you love on Github.
The API call to do this is: GET https://api.github.com/repos/[git repo]/commits
Show the commits in a list, newest on top. The list items should at least show the first line of
each commit message and its timestamp. A commit should be rendered in a separate
component.
- __Part 2: Commit detail page__
The user should be able to see the details of a specific commit in a clear manner on a separate
page. The details should include the commit messages (which can span multiple lines). Any
extra information that you would like to present can also be shown there.
- __Part 3: Date range of the commit overview__
The user should be able to change the date range of the commit overview to a user defined
date range. For example, the user should be able to set it to the entire last year, or just commits
since 2 days ago.
- __Part 4: Testing__
Of course you wrote unit tests for the app you just created. If you did not do so,

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
