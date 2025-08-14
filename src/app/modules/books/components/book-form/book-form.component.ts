import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() isEditMode: boolean = false;
  @Input() set bookToEdit(book: Book | null) {
    if (book) this.bookForm.patchValue(book);
  }
  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Book>();

  public bookForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    author: new FormControl<string>('', [Validators.required]),
    isbn: new FormControl<string>('', [Validators.required])
  });
  
  onSubmit(): void {
    this.submit.emit(this.bookForm.value as Book);
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
