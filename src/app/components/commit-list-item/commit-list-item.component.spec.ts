import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubCommit } from 'src/app/services/github.service';
import { TestUtils } from 'src/app/utils/test-utils';

import { CommitListItemComponent } from './commit-list-item.component';

describe('CommitListItemComponent', () => {
  const dummyMessage = 'Some commit message 1';
  const dummyDate = new Date('2022-10-15T06:27:26Z');
  const dummyCommit: GithubCommit = TestUtils.createGithubCommit(dummyDate, dummyMessage);
  let component: CommitListItemComponent;
  let fixture: ComponentFixture<CommitListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommitListItemComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitListItemComponent);
    component = fixture.componentInstance;
    component.commit = dummyCommit;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have date title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('li div:nth-child(1)')?.getAttribute('title')
    ).toContain(dummyDate);
  });

  it('should render the commit message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('li div:nth-child(2)')?.textContent
    ).toContain(dummyMessage);
  });

  it('should render the expand commit icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('li div:nth-child(3) svg')).toBeTruthy();
  });
});
