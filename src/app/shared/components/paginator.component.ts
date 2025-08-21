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
  public pages: (string | number)[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = this.generatePagesArray();
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

  isNumber(value: any): value is number {
    return typeof value === 'number';
  }

  private generatePagesArray(): (string | number)[] {
    const maxPagesToShow = 7;
    const currentPage = this.currentPage;
    const totalPages = this.totalPages;
    
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (string | number)[] = [];
    const sidePages = Math.floor((maxPagesToShow - 3) / 2);

    pages.push(1);

    if (currentPage > sidePages + 2) {
      pages.push('...');
    }

    const startPage = Math.max(2, currentPage - sidePages);
    const endPage = Math.min(totalPages - 1, currentPage + sidePages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);      
    }

    if (currentPage < totalPages - sidePages -1) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  }
}
