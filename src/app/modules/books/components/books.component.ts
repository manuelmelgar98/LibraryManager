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
  books: Book[] = [];
  selectedBook: Book | null = null;
  isEditMode: boolean = false;
  isVisible: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data) => this.books = data);
  }

  onEditBook(book?: Book): void {
    this.isVisible = true;
    this.selectedBook = book ? {...book} : {
      title: '',
      isbn: '',
      author: ''
    }

    if (book) this.isEditMode = true;
    else this.isEditMode = false;

  }

  onCancelEdit(): void {
    this.selectedBook = null;
    this.isEditMode = false;
    this.isVisible = false;
  }

  handleBookSubmit(book: Book): void {    
    if(this.isEditMode && this.selectedBook?.id) {
      this.bookService.updateBook(this.selectedBook.id, book).subscribe({
        next: () => {
          this.loadBooks();
          this.onCancelEdit();
        },
        error: (err) => console.error('Error al actualizar', err),
      });
    } else {
      this.bookService.addBook(book).subscribe({
        next: () => {
          this.loadBooks();
          this.onCancelEdit();    
        },
        error: (err) => {
          console.error('Error al crear libro: ',err);        
        }
      })
    }
  }
  
}
