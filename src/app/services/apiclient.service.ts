import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'src/assets/book.model';

@Injectable({
  providedIn: 'root'
})
export class ApiclientService {
  private apiURL = 'assets/db.json'
  //private apiURL = 'http://10.0.2.2:3000'

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL);
  }
}
