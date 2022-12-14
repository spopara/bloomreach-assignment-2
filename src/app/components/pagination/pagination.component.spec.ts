import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.currentPage = 20;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('#pagination-showing-page')?.textContent
    ).toContain('Showing page: 20');
  });

  it('should handle event on previous button click', fakeAsync(() => {
    spyOn(component, 'handlePreviousClick');
    fixture.debugElement.nativeElement
      .querySelector('#pagination-previous')
      .click();
    tick();
    expect(component.handlePreviousClick).toHaveBeenCalled();
  }));

  it('should handle event on next button click', fakeAsync(() => {
    spyOn(component, 'handleNextClick');
    fixture.debugElement.nativeElement
      .querySelector('#pagination-next')
      .click();
    tick();
    expect(component.handleNextClick).toHaveBeenCalled();
  }));

  it('should disable next button', () => {
    component.nextDisabled = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#pagination-next.pointer-events-none')).toBeTruthy();
  });

  it('should disable previous button', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#pagination-previous.pointer-events-none')).toBeTruthy();
  });
});
