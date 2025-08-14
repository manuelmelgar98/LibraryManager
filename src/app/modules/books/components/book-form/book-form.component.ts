import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; //Cambiar por las directivas, pipes y/o funcionalidades futuras
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {
  @Output() bookAdded = new EventEmitter<Book>();
  public bookForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    author: new FormControl<string>('', [Validators.required]),
    isbn: new FormControl<string>('', [Validators.required])
  });

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.bookAdded.emit(this.bookForm.value as Book);
      this.bookForm.reset();
    }

  }

}
