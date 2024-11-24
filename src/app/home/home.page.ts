import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDBService } from 'src/app/services/service-db.service';
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

  constructor(private router: Router, private serviceDB: ServiceDBService) { }

  ngOnInit() {
    this.loadBooks();
  }

  ionViewWillEnter() {
    this.loadUserLibrary();
  }

  loadBooks() {
    this.isLoading = true;

    this.serviceDB.fetchBooks().subscribe((books: Books[]) => {
      this.allBooks = books;
      this.isLoading = false;
      this.filterRecommendedBooks();
    });
  }

  loadUserLibrary() {
    this.serviceDB.fetchBooks().subscribe((books: Books[]) => {
      this.userLibrary = books;
      this.recentlyAddedBooks = this.userLibrary.slice(-2).reverse();
      this.filterRecommendedBooks();
    });
  }

  filterRecommendedBooks() {
    const libraryISBNs = this.userLibrary.map(book => book.isbn);
    this.recommendedBooks = this.allBooks.filter(book => !libraryISBNs.includes(book.isbn));
    console.log("Libros filtrados");
  }

  seeBookDetail(isbn: number) {
    this.router.navigate([`/tabs/home/book/${isbn}`]);
  }
}
