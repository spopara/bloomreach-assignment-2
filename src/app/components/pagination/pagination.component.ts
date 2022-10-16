import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  @Input() currentPage = 1;
  @Input() nextDisabled = false;
  @Output() paginationEmmiter = new EventEmitter<'next' | 'previous'>();

  constructor() {}

  ngOnInit(): void {}

  handleNextClick(): void {
    this.paginationEmmiter.emit('next');
  }

  handlePreviousClick(): void {
    this.paginationEmmiter.emit('previous');
  }
}
