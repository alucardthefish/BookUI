import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Books';
  state: Boolean = false;

  hideForm() {
    this.state = !this.state;
    return this.state;
  }
}
