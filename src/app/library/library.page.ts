import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  userLibrary: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadUserLibrary();
  }

  ionViewWillEnter() {
    this.loadUserLibrary();
  }

  loadUserLibrary() {
    const libraryData = sessionStorage.getItem('userLibrary');
    this.userLibrary = libraryData ? JSON.parse(libraryData) : [];
    console.log(this.userLibrary);
  }

  seeBookDetail(bookId: number) {
    this.router.navigate([`/tabs/library/book/${bookId}`]);
  }
}
