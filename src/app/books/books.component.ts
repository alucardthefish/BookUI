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
  counter: number;
  isNotRequesting: Boolean;
  styleColor: String;

  //public books: Array<any> = []
  books: Book[];

  constructor(private bookService: BookService,
    public fb: FormBuilder) {

      this.isHide = true;
      this.isNotUpdating = true;
      this.counter = 10;
      this.isNotRequesting = true;
      this.styleColor = "info";

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
    this.isNotRequesting = false;
    this.styleColor = "info"
    var newBook: any = new Book();
    newBook.title = this.form.get('title').value;
    newBook.author = this.form.get('author').value;
    newBook.read = this.form.get('read').value;
    this.setProgress(50);

    this.bookService.addBook(newBook).subscribe((resp: any) => {
      this.books.push(resp);
      this.form.reset({
        title: '',
        author: '',
        read: false
      });
      this.setProgress(100);
    })

  }

  setProgress(prc: number) {
    this.counter = prc;
    if (prc == 100) {
      setTimeout(() => {
        this.isNotRequesting = true;
        this.counter = 10;
      }, 2000);
    }
  }

  toggleButton() {
    this.isHide = !this.isHide;
    if (!this.isNotUpdating) {
      this.isNotUpdating = !this.isNotUpdating;
    }
  }

  pushCancel() {
    console.log("cancelar")
    this.isNotUpdating = true;
  }

  deleteBook(id: string) {
    console.log(`delete book with id: ${id}`);
    this.bookService.delete(id).subscribe((resp: any) => {
      console.log(resp);
      this.loadBooks();
    });
    this.pushCancel();
    alert("Book deleted successfully");
  }

  setUpdateBook(book: Book) {
    
    this.isNotUpdating = false;
    if (!this.isHide) {
      this.isHide = !this.isHide;
    }

    this.updateForm.patchValue(book);
    this.bookId = book.id;

    window.location.href = '#update-form';

  }

  updateBook() {

    this.isNotRequesting = false;
    this.styleColor = "warning"
    var updBook: any = new Book();
    updBook.id = this.bookId;
    updBook.title = this.updateForm.get('title').value;
    updBook.author = this.updateForm.get('author').value;
    updBook.read = this.updateForm.get('read').value;
    console.log(updBook);
    this.setProgress(50);

    this.bookService.update(updBook).subscribe((resp: any) => {
      this.updateForm.reset({
        title: '',
        author: '',
        read: false
      });
      this.isNotUpdating = true;
      this.loadBooks();
      this.setProgress(100);
    });

  }

}
