import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  book: any;
  isLoading: boolean = true;
  isInLibrary: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBookData(id);
    } else {
      console.log("ID no encontrado");
    }
  }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.checkIfInLibrary(id);
    } else {
      console.log("ID no encontrado");
    }
  }

  loadBookData(id: string) {
    this.http.get<any[]>('assets/data.json').subscribe(data => {
      this.book = data.find(book => book.id === +id);
      this.isLoading = false;
    }, error => {
      console.error("Error al cargar los datos:", error);
      this.isLoading = false;
    });
  }

  addToLibrary() {
    let library = JSON.parse(sessionStorage.getItem('userLibrary') || '[]');

    if (!this.isInLibrary) {
      library.push(this.book);
      sessionStorage.setItem('userLibrary', JSON.stringify(library));
      console.log("Libro agregado:", this.book);
    } else {
      library = library.filter((b: any) => b.id !== this.book.id);
      sessionStorage.setItem('userLibrary', JSON.stringify(library));
      console.log("Libro eliminado:", this.book);
    }
    this.isInLibrary = !this.isInLibrary;
  }

  checkIfInLibrary(id: string) {
    let library = JSON.parse(sessionStorage.getItem('userLibrary') || '[]');
    this.isInLibrary = library.some((b:any) => b.id === +id);
  }
}
