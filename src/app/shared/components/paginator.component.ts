import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 5;
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsChange = new EventEmitter<number>();

  public totalPages: number = 0;
  public pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  onPrevious(): void {
    this.goToPage(this.currentPage - 1);
  }

  onNext(): void {
    this.goToPage(this.currentPage + 1);
  }

  onItemsSelect(items: Event): void {
    const target = items.target as HTMLSelectElement;
    if (target) {
      const value = target.value;
      
      this.itemsChange.emit(parseInt(value, 10))
    }
  }
}
