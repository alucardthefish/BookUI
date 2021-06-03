import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { AddBookButtonComponent } from './components/add-book-button/add-book-button.component';

import { BookService } from "./services/book.service";
import { baseURL } from "./shared/baseUrl";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AddBookButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    BookService,
    {provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
