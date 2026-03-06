import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  bookForm: FormGroup;
  constructor(private fb: FormBuilder) {
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
}