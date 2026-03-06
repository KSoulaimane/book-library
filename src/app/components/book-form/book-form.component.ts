import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {
  @Output() addBook = new EventEmitter<Book>();

  titre = '';
  auteur = '';
  categorie = '';
  annee!: number;
  disponible = true;

  submitForm() {
    if (!this.titre) return; // empêche l'ajout si le titre est vide
    const newBook: Book = {
      id: Date.now(), // id simple unique
      titre: this.titre,
      auteur: this.auteur,
      categorie: this.categorie,
      annee: this.annee,
      disponible: this.disponible
    };
    this.addBook.emit(newBook);

    // Réinitialiser le formulaire
    this.titre = '';
    this.auteur = '';
    this.categorie = '';
    this.annee = undefined!;
    this.disponible = true;
  }
}