import { Component } from '@angular/core';
import {JsonLoaderService} from './services/json-loader.service';
import {IDomNode} from './models/IDomNode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  pathToNode:string;

  constructor(){
  }

  public addDomNode(value) {
    this.pathToNode = value;
  }
}
