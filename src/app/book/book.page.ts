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

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBookData(id);
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
}
