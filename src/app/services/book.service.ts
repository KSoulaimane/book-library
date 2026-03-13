import { Injectable } from '@angular/core';
import { Book } from '../models/book'; // Ajuste le chemin si nécessaire
import { BehaviorSubject, Observable } from 'rxjs'; // ← Importer BehaviorSubject et Observable
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class BookService {
   // 1. Créer une liste de livres initiale (statique pour commencer)
   private initialBooks: Book[] = [
    { id: 1, titre: 'Le Petit Prince', auteur: 'Saint-Exupéry', categorie: 'Conte', annee: 1943, disponible: true },
    { id: 2, titre: '1984', auteur: 'George Orwell', categorie: 'Science-fiction', annee: 1949, disponible: false },
    { id: 3, titre: 'Harry Potter', auteur: 'J.K. Rowling', categorie: 'Fantasy', annee: 1997, disponible: true }
  ];

  private booksSubject = new BehaviorSubject<Book[]>(this.initialBooks);

  books$: Observable<Book[]> = this.booksSubject.asObservable();
  booksCount$: Observable<number> = this.booksSubject.pipe(
    map(books => books.length)
  );
  
  constructor() { }

  addBook(book: Book): void {
    const currentBooks = this.booksSubject.value;
    
    const newId = currentBooks.length > 0 
      ? Math.max(...currentBooks.map(b => b.id)) + 1 
      : 1;
    
    const newBook = { ...book, id: newId };
    
    this.booksSubject.next([...currentBooks, newBook]);
  }

  deleteBook(id: number): void {
    const currentBooks = this.booksSubject.value;
    
    const updatedBooks = currentBooks.filter(book => book.id !== id);
    
    this.booksSubject.next(updatedBooks);
  }

  getAvailableBooks(): Observable<Book[]> {
    return this.booksSubject.pipe(
      map(books => books.filter(book => book.disponible))
    );
  }

  updateBook(updatedBook: Book): void {
    const currentBooks = this.booksSubject.value;
    const updatedBooks = currentBooks.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    );
    this.booksSubject.next(updatedBooks);
  }
}
