import { Component, OnInit } from '@angular/core';
import { Book } from 'src/assets/book.model';
import { Router } from '@angular/router';
import { ApiclientService } from '../services/apiclient.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  allBooks: Book[] = [];
  searchResults: Book[] = [];
  searchTerm: string = '';

  constructor(private router: Router, private apiClient: ApiclientService) { }

  ngOnInit() {
    this.loadAllBooks();
  }

  loadAllBooks() {
    this.apiClient.getAllBooks().subscribe(data => {
      this.allBooks = data;
    }, error => {
      console.error('Error al cargar los libros', error);
    });
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
        book.author.toLowerCase().includes(this.searchTerm) ||
        book.genre.toLocaleLowerCase().includes(this.searchTerm)
      );
    }
  }

  seeBookDetail(bookId: number) {
    this.router.navigate([`/tabs/search/book/${bookId}`])
  }

}
