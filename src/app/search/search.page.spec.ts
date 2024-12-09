import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPage } from './search.page';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
