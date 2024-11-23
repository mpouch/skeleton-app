import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

import { Books } from './books';

@Injectable({
  providedIn: 'root'
})
export class ServiceDBService {
  public database!: SQLiteObject;

  createBook: string = `CREATE TABLE IF NOT EXISTS book(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    year INTEGER,
    description TEXT,
    coverImage TEXT
  )`;

  addBook: string = `INSERT INTO book (title, author, year, description, coverImage) VALUES (?, ?, ?, ?, ?)`;

  listBook = new BehaviorSubject([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController) {
    this.createDB();
  }

  createDB() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;

        this.createTables();
      }).catch(e => {
        this.presentToast("Error DB: " + e);
      })
    })
  }

  async createTables() {
    try {
      await this.database.executeSql(this.createBook, []);
      await this.database.executeSql(this.addBook, []);
      this.loadBooks();

      this.isDBReady.next(true);
    } catch (e) {
      this.presentToast("Error: " + e);
    }
  }

  loadBooks() {
    this.database.executeSql("SELECT * FROM book", []).then(res => {
      let books: Books[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          books.push({
            id: res.rows.item(i).id,
            title: res.rows.item(i).title,
            author: res.rows.item(i).author,
            year: res.rows.item(i).year,
            description: res.rows.item(i).description,
            coverImage: res.rows.item(i).coverImage
          })
        }
      }
      this.listBook.next(books as any);
    })
  }

  async insertBook(book: Books) {
    try {
      await this.database.executeSql(this.addBook, [book.title, book.author, book.year, book.description, book.coverImage]);
      this.loadBooks();
      this.presentToast('Libro guardado con éxito');
    } catch (e) {
      this.presentToast('Error: ' + e);
    }
  }
  

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      icon: 'globe'
    });

    await toast.present();
  }

  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchBooks(): Observable<Books[]> {
    return this.listBook.asObservable();
  }
}
