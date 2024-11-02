import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book } from 'src/assets/book.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  allBooks: Book[] = [];
  recentlyAddedBooks: Book[] = [];
  recommendedBooks: Book[] = [];
  userLibrary: any[] = [];

  isLoading: boolean = true;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadRecommendedBooks();
  }

  ionViewWillEnter() {
    this.loadUserLibrary();
  }

  loadUserLibrary() {
    const libraryData = sessionStorage.getItem('userLibrary');
    this.userLibrary = libraryData ? JSON.parse(libraryData) : [];
    this.recentlyAddedBooks = this.userLibrary.slice(-2).reverse();
    console.log("Librería usuario cargada")
    console.log(this.userLibrary);
    this.filterRecommendedBooks();
  }

  loadRecommendedBooks() {
    this.isLoading = true;

    setTimeout(() => {
      this.http.get<any[]>('/assets/data.json').subscribe(data => {
        this.allBooks = data;
        this.filterRecommendedBooks();
        this.isLoading = false;
      });
    }, 2000);
  }

  filterRecommendedBooks() {
    const libraryIds = this.userLibrary.map(book => book.id);
    this.recommendedBooks = this.allBooks.filter(book => !libraryIds.includes(book.id));
    console.log("Libros filtrados")
  }

  seeBookDetail(bookId: number) {
    this.router.navigate([`/tabs/home/book/${bookId}`]);
  }

}
