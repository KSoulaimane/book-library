import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatToolbarModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  afficherDisponibles = false;

  books: Book[] = [
    {
      id: 1,
      titre: 'Clean Code',
      auteur: 'Robert C. Martin',
      categorie: 'Programmation',
      annee: 2008,
      disponible: true
    },
    {
      id: 2,
      titre: 'Angular Up & Running',
      auteur: 'Shyam Seshadri',
      categorie: 'Web',
      annee: 2018,
      disponible: false
    },
    {
      id: 3,
      titre: 'Design Patterns',
      auteur: 'Erich Gamma',
      categorie: 'Architecture',
      annee: 1994,
      disponible: true
    }
  ];

  supprimerLivre(id: number){
    this.books = this.books.filter(book => book.id != id);
  }
}