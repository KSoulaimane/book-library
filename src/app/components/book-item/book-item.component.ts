import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent {
  @Input() book!: Book;
  @Output() deleteBook = new EventEmitter<number>();
  @Output() editBook = new EventEmitter<Book>();
 
  constructor() { }

  onDelete() {
    this.deleteBook.emit(this.book.id);
  }
  
  onEdit() {
    this.editBook.emit(this.book);
  }
}
