import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookButtonComponent } from './add-book-button.component';

describe('AddBookButtonComponent', () => {
  let component: AddBookButtonComponent;
  let fixture: ComponentFixture<AddBookButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
