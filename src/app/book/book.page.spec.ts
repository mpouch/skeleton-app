import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookPage } from './book.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('BookPage', () => {
  let component: BookPage;
  let fixture: ComponentFixture<BookPage>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: { get: (key: string) => (key === 'isbn' ? '9781234567890' : null) }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        HttpClient, HttpHandler, SQLite
      ]
    })
    fixture = TestBed.createComponent(BookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
