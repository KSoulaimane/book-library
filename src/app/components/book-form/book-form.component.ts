import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {
  @Output() addBook = new EventEmitter<Book>();
  @Input() bookToEdit: Book | null = null;

  ngOnInit(): void {
    if (this.bookToEdit) {
      this.bookForm.patchValue(this.bookToEdit);
    }
  }
  bookForm: FormGroup;
  constructor(private fb: FormBuilder,  private dialog: MatDialog, private bookService: BookService) {
    this.bookForm = this.fb.group({
      titre: ['', Validators.required],
      auteur: [''],
      categorie: [''],
      annee: [''],
      disponible: [true]
    });
  }
  submitForm() {

    if (this.bookForm.invalid) {
      return;
    }
  
    const newBook: Book = {
      id: Date.now(),
      ...this.bookForm.value
    };
  
    this.addBook.emit(newBook);
  
    this.bookForm.reset({
      disponible: true
    });
  }
  ouvrirFormModification(book: Book) {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '400px'
    });
  
    dialogRef.componentInstance.bookToEdit = book;
  
    dialogRef.componentInstance.addBook.subscribe((updatedBook: Book) => {
      updatedBook.id = book.id;
      this.bookService.updateBook(updatedBook);
      dialogRef.close();
    });
  }
  
}