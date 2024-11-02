import { Component, OnInit } from '@angular/core';
import { Book } from 'src/assets/book.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  allBooks: Book[] = [];
  searchResults: Book[] = [];
  searchTerm: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.loadAllBooks();
  }

  loadAllBooks() {
    this.http.get<Book[]>('/assets/data.json').subscribe(data => {
      this.allBooks = data;
    })
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterBooks();
  }

  filterBooks() {
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
    } else {
      this.searchResults = this.allBooks.filter(book =>
        book.title.toLowerCase().includes(this.searchTerm) ||
        book.author.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  seeBookDetail(bookId: number) {
    this.router.navigate([`/tabs/search/book/${bookId}`])
  }

}
