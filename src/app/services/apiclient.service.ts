import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'src/assets/book.model';

@Injectable({
  providedIn: 'root'
})
export class ApiclientService {
  private apiURL = 'assets/data.json'

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL);
  }
}
