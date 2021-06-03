import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseUrl";
import { Book } from '../shared/Book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { 
    console.log('Book Service');
  }

  getBooks(): Observable<Book[]> {
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200'});
      //.set('Type-content', 'application/json');
    return this.http.get<Book[]>(baseURL, {headers: header});
  }

  addBook(book: Book) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      })
    };
    

    return this.http.post(baseURL, book, httpOptions);
  }

  delete(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      })
    };
    return this.http.delete(baseURL + "/" + id, httpOptions);
  }

  update(book: Book) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      })
    };
    return this.http.put(baseURL + "/" + book.id, book, httpOptions);
  }
}
