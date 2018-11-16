import { Component, OnInit } from '@angular/core';
import { FiguresService } from '../figures.service';
import { Figure } from '../Interfaces/Figures';
import { AuthService } from '../auth.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'



@Component({
  selector: 'app-figures',
  templateUrl: './figures.component.html',
  styleUrls: ['./figures.component.css']
})
export class FiguresComponent implements OnInit {


  // array tha will get back from response all the figures from database
  figures = [];

  // default value of the filter univers
  univers = 'All';

  // array of all items to be paged
  allItems: Array<Figure> = new Array<Figure>();

  // pager object
  pager: any = {};

  // paged items
  pagedItems = [];

  body = {
    'num': '',
    'userId': '',
    // 'collec': ''
  };

  constructor(private _figuresService: FiguresService, private _authService: AuthService) {
  }


  // On the init of the page I get all the figures of database
  ngOnInit() {
    const univers = this.univers;
    this._figuresService.getFigures(univers)
      .subscribe(
        data => {
          // set items to json response
          this.allItems = data


          // initialize to page 1

        },
        err => console.log(err)
      );
  }





  // on click of filter button I get all figures of this univers
  getFigures(event) {
    // get id of pressed button
    const univers = event.target.id;

    this._figuresService.getFigures(univers)
      .subscribe(
        data => {
          // set items to json response
          this.allItems = data

          // initialize to page 1

        },
        err => console.log(err)
      );
  }


  // On click of the button I select the figure clicked and add it to user connected collection
  addFigure(num) {
    const id = localStorage.getItem('id');
    this.body.userId = id;
    this.body.num = num;
    // this.body.collec = 'collec';
    this._figuresService.addFigure(this.body)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

  addFigureWish(num) {
    const id = localStorage.getItem('id');
    this.body.userId = id;
    this.body.num = num;
    //this.body.collec = 'wish';
    this._figuresService.addFigureWish(this.body)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

}
