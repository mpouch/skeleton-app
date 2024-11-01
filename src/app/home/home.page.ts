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
  recentlyAddedBooks: Book[] = [];
  recommendedBooks: Book[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get<any[]>('/assets/data.json').subscribe(data => {
      this.recentlyAddedBooks = data.slice(0, 2);
      this.recommendedBooks = data.slice(2);
    })
  }

  seeBookDetail(bookId: number) {
    this.router.navigate([`/tabs/home/book/${bookId}`]);
  }

}
