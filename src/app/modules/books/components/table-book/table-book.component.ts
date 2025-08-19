import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-table-book',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './table-book.component.html',
  styleUrl: './table-book.component.css'
})
export class TableBookComponent {
  @Input() books: Book[] = [];
  @Output() editBook = new EventEmitter<Book>();
  @Output() deleteBook = new EventEmitter<string>();


  onView(book: Book): void {
    this.editBook.emit(book as Book);    
  }

  onDelete(id: string): void {
    this.deleteBook.emit(id);
  }
}
