import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GithubCommit, GithubService } from 'src/app/services/github.service';
import { TestUtils } from 'src/app/utils/test-utils';
import { CommitListItemComponent } from '../commit-list-item/commit-list-item.component';
import { CommitListComponent } from './commit-list.component';

describe('CommitListComponent', () => {
  const dummyCommitArray: GithubCommit[] = [
    TestUtils.createGithubCommit(
      new Date('2022-10-16T06:27:26Z'),
      'Some commit message 1'
    ),
    TestUtils.createGithubCommit(
      new Date('2022-10-15T06:27:26Z'),
      'Some commit message 2'
    ),
  ];
  let fakeGithubService: GithubService;
  let component: CommitListComponent;
  let fixture: ComponentFixture<CommitListComponent>;

  beforeEach(async () => {
    fakeGithubService = jasmine.createSpyObj<GithubService>('GithubService', {
      fetchCommits: of(dummyCommitArray),
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

  it('should render date picker', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[type="date"]')).toBeTruthy();
  });

  it('should increment page on next', () => {
    component.currentPage = 5;
    component.nextDisabled = false;
    component.handlePageChanged('next');
    expect(component.currentPage).toEqual(6);
  });

  it('should decrement page on previous', () => {
    component.currentPage = 5;
    component.handlePageChanged('previous');
    expect(component.currentPage).toEqual(4);
  });

  it('should NOT increment page when next is disabled', () => {
    component.currentPage = 5;
    component.nextDisabled = true;
    component.handlePageChanged('next');
    expect(component.currentPage).toEqual(5);
  });

  it('should NOT decrement page when on first page', () => {
    component.currentPage = 1;
    component.handlePageChanged('previous');
    expect(component.currentPage).toEqual(1);
  });

  it('should reset to first page on date change', () => {
    component.currentPage = 5;
    const event = { value: '12-12-2020' } as unknown as EventTarget;
    component.handleDateChanged(event);
    expect(component.currentPage).toEqual(1);
  });

  it('should call get commits on date change', fakeAsync(() => {
    spyOn(component, 'getCommits');
    const event = { value: '12-12-2020' } as unknown as EventTarget;
    component.handleDateChanged(event);
    expect(component.getCommits).toHaveBeenCalled();
  }));
});
