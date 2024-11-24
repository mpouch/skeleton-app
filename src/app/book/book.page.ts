import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AnimationController } from '@ionic/angular';
import { ServiceDBService } from '../services/service-db.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  @ViewChild('addButton', { read: ElementRef }) addButton?: ElementRef<HTMLIonButtonElement>;

  book: any;
  isLoading: boolean = true;
  isInLibrary: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private animationCtrl: AnimationController,
    private dbService: ServiceDBService,
  ) { }

  ngOnInit() {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    if (isbn) {
      this.loadBookData(isbn);
    } else {
      console.error("ISBN no encontrado");
    }
  }

  ionViewWillEnter() {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    if (isbn) {
      this.checkIfInLibraryByISBN(+isbn);
    } else {
      console.error("ISBN no encontrado");
    }
  }

  loadBookData(isbn: string) {
    this.dbService.fetchBooks().subscribe(books => {
      this.book = books.find(book => book.isbn === +isbn);
  
      if (!this.book) {
        this.http.get<any[]>('assets/data.json').subscribe(data => {
          this.book = data.find(book => book.isbn === +isbn);
          this.isLoading = false;
          if (!this.book) {
            console.error("Libro no encontrado");
          }
        });
      } else {
        this.isLoading = false;
      }
    });
  }

  checkIfInLibraryByISBN(isbn: number) {
    this.dbService.fetchBooks().subscribe((books) => {
      this.isInLibrary = books.some((book) => book.isbn === isbn);
      console.log("Libro está en la biblioteca:", this.isInLibrary, "ISBN:", isbn);
    }, (error) => {
      console.error("Error al verificar el estado del libro:", error);
    });
  }

  addToLibrary() {
    if (!this.book) {
      return;
    }

    const { id, ...bookData } = this.book;

    if (!this.isInLibrary) {
      this.dbService.insertBook(this.book).then(() => {
        console.log("Libro agregado a la biblioteca:", this.book);
        this.isInLibrary = true;
        this.animateButton();
      }).catch((error) => console.error("Error al agregar el libro:", error));
    } else {
      this.removeFromLibrary();
    }
  }
  
  removeFromLibrary() {
    if (!this.book) {
      return;
    }
  
    if (this.isInLibrary) {
      this.dbService.removeBook(this.book.isbn).then(() => {
        console.log("Libro eliminado de la biblioteca:", this.book);
        this.isInLibrary = false;
        this.animateButton();
      }).catch((error) => console.error("Error al eliminar el libro:", error));
    }
  }

  animateButton() {
    if (this.addButton) {
      const buttonAnimation = this.animationCtrl
        .create()
        .addElement(this.addButton.nativeElement)
        .duration(100)
        .keyframes([
          { offset: 0, transform: 'scale(1)', opacity: '1' },
          { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
          { offset: 1, transform: 'scale(1)', opacity: '1' },
        ]);

      buttonAnimation.play();
    }
  }
}
