import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryPage } from './library.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('LibraryPage', () => {
  let component: LibraryPage;
  let fixture: ComponentFixture<LibraryPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    });
    fixture = TestBed.createComponent(LibraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
