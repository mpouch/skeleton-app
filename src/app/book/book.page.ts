import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AnimationController } from '@ionic/angular';

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

  constructor(private route: ActivatedRoute, private http: HttpClient, private animationCtrl: AnimationController) { }

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
    this.checkIfInLibrary(this.book.id);

    this.animateButton();
  }

  checkIfInLibrary(id: string) {
    let library = JSON.parse(sessionStorage.getItem('userLibrary') || '[]');
    this.isInLibrary = library.some((b: any) => b.id === +id);
    console.log("Libro está en biblioteca:", this.isInLibrary, "ID:", id);
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

      buttonAnimation.play()
    }
  }
}
