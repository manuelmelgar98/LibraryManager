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
    this.initialFormValue = this.bookForm.value;
  }
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Book>();
  private initialFormValue: any;

  public bookForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    author: new FormControl<string>('', [Validators.required]),
    genre: new FormControl<string>('', [Validators.required]),
    year: new FormControl<number | null>(null, [Validators.required]),
    isbn: new FormControl<string>('', [Validators.required])
  });
  
  onSubmit(): void {
    this.save.emit(this.bookForm.value as Book);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  public get hasChanges(): boolean {
    return JSON.stringify(this.initialFormValue) !== JSON.stringify(this.bookForm.value);
  }

}
