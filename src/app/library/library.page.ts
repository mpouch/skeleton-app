import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDBService } from '../services/service-db.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  userLibrary: any[] = [];

  constructor(private router: Router, private dbService: ServiceDBService) { }

  ngOnInit() {
    this.loadUserLibrary();
  }

  ionViewWillEnter() {
    this.loadUserLibrary();
  }

  loadUserLibrary() {
    this.dbService.fetchBooks().subscribe(books => {
      this.userLibrary = books;
      console.log(this.userLibrary);
    });
  }

  seeBookDetail(isbn: number) {
    this.router.navigate([`/tabs/library/book/${isbn}`]);
  }
}
