import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GithubCommit, GithubService } from 'src/app/services/github.service';
import { CommitListItemComponent } from '../commit-list-item/commit-list-item.component';
import { CommitListComponent } from './commit-list.component';

const dummyCommitArray: GithubCommit[] = [
  {
    commit: {
      message: 'Some commit message 1',
      author: {
        name: 'Name Surname 1',
        email: 'name.surname1@mail.com',
        date: new Date('2022-10-15T06:27:26Z'),
      },
    },
  },
  {
    commit: {
      message: 'Some commit message 2',
      author: {
        name: 'Name Surname 2',
        email: 'name.surname2@mail.com',
        date: new Date('2022-10-16T06:27:26Z'),
      },
    },
  },
];
const dummyCommitArrayCopy = [...dummyCommitArray];
let fakeGithubService: GithubService;

describe('CommitListComponent', () => {
  let component: CommitListComponent;
  let fixture: ComponentFixture<CommitListComponent>;

  beforeEach(async () => {
    fakeGithubService = jasmine.createSpyObj<GithubService>('GithubService', {
      getCommits: of(dummyCommitArray),
    });
    await TestBed.configureTestingModule({
      declarations: [CommitListComponent, CommitListItemComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: GithubService,
          useValue: fakeGithubService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render commit messages title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(
      'Commit messages of VS CODE'
    );
  });

  it('should render list of commits', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-commit-list-item')?.length).toBe(2);
  });

  it('should sort the list of commits', () => {
    expect(component.commits).toEqual(dummyCommitArrayCopy.reverse());
  });
});
