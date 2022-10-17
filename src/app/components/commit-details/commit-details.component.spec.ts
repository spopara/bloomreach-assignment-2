import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { GithubCommit, GithubService } from 'src/app/services/github.service';
import { TestUtils } from 'src/app/utils/test-utils';
import { CommitDetailsComponent } from './commit-details.component';

describe('CommitDetailsComponent', () => {
  const dummyCommit: GithubCommit = TestUtils.createGithubCommit();
  let component: CommitDetailsComponent;
  let fixture: ComponentFixture<CommitDetailsComponent>;
  let fakeGithubService: GithubService;

  beforeEach(async () => {
    fakeGithubService = TestUtils.createFakeGithubService([dummyCommit]);

    await TestBed.configureTestingModule({
      declarations: [CommitDetailsComponent],
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
    fixture = TestBed.createComponent(CommitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render back icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#commit-details-back')).toBeTruthy();
  });

  it('should handle back icon click', fakeAsync(() => {
    fixture.debugElement.nativeElement
      .querySelector('#commit-details-back')
      .dispatchEvent(new Event('click'));
    tick();
    expect(fakeGithubService.selectCommit).toHaveBeenCalled();
  }));

  it('should render author name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('#commit-details-name')?.textContent
    ).toContain(dummyCommit.commit.author.name);
  });

  it('should render author email', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('#commit-details-email')?.textContent
    ).toContain(dummyCommit.commit.author.email);
  });

  it('should render commit sha', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('#commit-details-sha')?.textContent
    ).toContain(dummyCommit.sha);
  });

  it('should render commit message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('#commit-details-message')?.textContent
    ).toContain(dummyCommit.commit.message);
  });

  it('should render commit url', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('#commit-details-url')?.textContent
    ).toContain(dummyCommit.commit.url);
  });
});
