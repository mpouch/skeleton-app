import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/assets/book.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  userLibrary: Book[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  seeBookDetail(bookId: number) {
    this.router.navigate([`/tabs/home/book/${bookId}`]);
  }
}
