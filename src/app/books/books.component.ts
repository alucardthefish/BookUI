import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BookService } from '../services/book.service';
import { Book } from '../shared/Book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  form: FormGroup;
  updateForm: FormGroup;
  isHide: Boolean;
  isNotUpdating: Boolean;
  bookId: String;

  //public books: Array<any> = []
  books: Book[];

  constructor(private bookService: BookService,
    public fb: FormBuilder) {

      this.isHide = true;
      this.isNotUpdating = true;

      this.form = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(2)]],
        author: ['', [Validators.required]],
        read: [false]
      });

      this.updateForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(2)]],
        author: ['', [Validators.required]],
        read: [false]
      });

    

   }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((resp: any) => {
      console.log(resp);
      this.books = resp;
    });
  }

  submitForm() {
    
    var newBook: any = new Book();
    newBook.title = this.form.get('title').value;
    newBook.author = this.form.get('author').value;
    newBook.read = this.form.get('read').value;

    this.bookService.addBook(newBook).subscribe((resp: any) => {
      console.log(resp);
      this.books.push(resp);
      this.form.reset();
    })

  }

  toggleButton() {
    this.isHide = !this.isHide;
    if (!this.isNotUpdating) {
      this.isNotUpdating = !this.isNotUpdating;
    }
  }

  deleteBook(id: string) {
    console.log(`delete book with id: ${id}`);
    this.bookService.delete(id).subscribe((resp: any) => {
      console.log(resp);
      this.loadBooks();
    });
  }

  setUpdateBook(book: Book) {
    console.log(book);
    this.isNotUpdating = false;
    if (!this.isHide) {
      this.isHide = !this.isHide;
    }

    this.updateForm.patchValue(book);
    this.bookId = book.id;


  }

  updateBook() {

    var updBook: any = new Book();
    updBook.id = this.bookId;
    updBook.title = this.updateForm.get('title').value;
    updBook.author = this.updateForm.get('author').value;
    updBook.read = this.updateForm.get('read').value;

    console.log("Book a modificar con id: " + this.bookId);
    this.bookService.update(updBook).subscribe((resp: any) => {
      console.log(resp);
      this.isNotUpdating = true;
      this.loadBooks();
    });

  }

}
