import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BookItemComponent } from '../book-item/book-item.component';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BookFormComponent } from '../book-form/book-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    BookItemComponent, // Assurez-vous que ce composant est correctement configuré,
    MatDialogModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  afficherDisponibles = false;
  books$: Observable<Book[]>; 
  booksCount$: Observable<number>;
  availableBooks$: Observable<Book[]>;

  constructor(private dialog: MatDialog, private bookService: BookService) { 
    this.books$ = this.bookService.books$;
    this.booksCount$ = this.bookService.booksCount$;
    this.availableBooks$ = this.bookService.getAvailableBooks();
  }

  ngOnInit(): void {
  }

  onDeleteBook(id: number): void {
    this.bookService.deleteBook(id);
  }

  ouvrirForm() {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '400px'
    });

    dialogRef.componentInstance.addBook.subscribe((newBook: Book) => {
      this.bookService.addBook(newBook); // Ajoute un livre via le service
      dialogRef.close(); // ferme le popup après ajout
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