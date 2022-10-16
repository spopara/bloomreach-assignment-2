import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { GithubCommit } from 'src/app/services/github.service';
import { TestUtils } from 'src/app/utils/test-utils';

import { CommitDetailsComponent } from './commit-details.component';

describe('CommitDetailsComponent', () => {
  let component: CommitDetailsComponent;
  let fixture: ComponentFixture<CommitDetailsComponent>;
  const dummyCommit: GithubCommit = TestUtils.createGithubCommit();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommitDetailsComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // let initial subject emit 'null' pass
    component.selectedCommit = dummyCommit;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render back icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#commit-details-back')).toBeTruthy();
  });

  it('should call handleBackClick on back icon click', fakeAsync(() => {
    spyOn(component, 'handleBackClick');
    fixture.debugElement.nativeElement
      .querySelector('#commit-details-back')
      .dispatchEvent(new Event('click'));
    tick();
    expect(component.handleBackClick).toHaveBeenCalled();
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
