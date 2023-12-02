import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  elements: string[];
  inputText: string;

  constructor() {
    this.elements = [];
    this.inputText = '';
  } 

  inputToElements(): void { 
    this.elements.push(this.inputText);
    this.inputText = '';
  }

  removeElement(index: number): void {
    this.elements.splice(index, 1);
    console.log("remove "+index)
  }
}
