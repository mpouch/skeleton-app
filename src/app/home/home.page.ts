import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDBService } from 'src/app/services/service-db.service';
import { ApiclientService } from '../services/apiclient.service';
import { Books } from '../services/books';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  allBooks: Books[] = [];
  recentlyAddedBooks: Books[] = [];
  recommendedBooks: Books[] = [];
  userLibrary: Books[] = [];

  isLoading: boolean = true;

  constructor(private router: Router, private serviceDB: ServiceDBService, private apiClient: ApiclientService) { }

  ngOnInit() {
    this.loadBooks();
  }

  ionViewWillEnter() {
    this.loadUserLibrary();
  }

  loadBooks() {
    this.isLoading = true;

    this.apiClient.getAllBooks().subscribe((books: Books[]) => {
      this.allBooks = books;
      this.isLoading = false;
      this.filterRecommendedBooks();
    })
  }

  loadUserLibrary() {
    this.serviceDB.fetchBooks().subscribe((books: Books[]) => {
      this.userLibrary = books;
      this.recentlyAddedBooks = this.userLibrary.slice(-2).reverse();
      this.filterRecommendedBooks();
    });
  }

  filterRecommendedBooks() {
    if (this.userLibrary.length === 0) {
      this.recommendedBooks = this.allBooks.slice(0, 10);
    } else {
      const libraryGenres = new Set(this.userLibrary.map(book => book.genre.toLowerCase()));
      const libraryISBNs = new Set(this.userLibrary.map(book => book.isbn));  
      this.recommendedBooks = this.allBooks.filter(book => {
        const matchesGenre = libraryGenres.has(book.genre.toLowerCase());
        const notInLibrary = !libraryISBNs.has(book.isbn);
        return matchesGenre && notInLibrary;
      });
    }
  
    console.log("Libros recomendados actualizados:", this.recommendedBooks);
  }
  
  

  seeBookDetail(isbn: number) {
    this.router.navigate([`/tabs/home/book/${isbn}`]);
  }
}
