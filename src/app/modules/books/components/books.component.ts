import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';

import { BookFormComponent } from './book-form/book-form.component';
import { BookTableComponent } from './book-table/book-table.component';
import { SearchBooksComponent } from './search-books/search-books.component';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, BookFormComponent, BookTableComponent, SearchBooksComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  public books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    })
  }
  
}
