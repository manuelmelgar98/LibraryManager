import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { showAlert, showConfirm } from '../../../core/utils/messages';

import { FormBookComponent } from './form-book/form-book.component';
import { TableBookComponent } from './table-book/table-book.component';
import { SearchBookComponent } from './search-book/search-book.component';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormBookComponent, TableBookComponent, SearchBookComponent],
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
      author: '',
      genre: '',
      year: null,
      isbn: ''
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
      console.log('ID enviado al servicio:', this.selectedBook.id);
        console.log('Tipo de ID:', typeof this.selectedBook.id);
        console.log('Payload enviado al servicio:', book);
      this.bookService.updateBook(this.selectedBook.id, book).subscribe({
        next: () => {
          this.loadBooks();
          this.onCancelEdit();
          showAlert('¡Libro actualizado exitosamente!', 'Libro actualizado.');
        },
        error: (err) => showAlert('Hubo un error al actualizar el libro', 'Error')
      });
    } else {
      this.bookService.addBook(book).subscribe({
        next: () => {
          this.loadBooks();
          this.onCancelEdit();
          showAlert('¡Libro creado exitosamente!', 'Libro creado.');
        },
        error: (err) => showAlert('Hubo un error al crear el libro', 'Error')
      })
    }
  }

  onDelete(id: string): void {
    showConfirm('¿Estás seguro de eliminar este libro?', () => {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks();
          this.onCancelEdit();
          showAlert('¡Libro eliminado exitosamente!', 'Libro eliminado.');
        },
        error: (err) => showAlert('Hubo un error al eliminar el libro', 'Error')
      })
    }, 'Eliminar libro.');
  }
  
}
