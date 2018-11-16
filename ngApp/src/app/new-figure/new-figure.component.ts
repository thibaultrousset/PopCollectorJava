import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FiguresService } from '../figures.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-figure',
  templateUrl: './new-figure.component.html',
  styleUrls: ['./new-figure.component.css']
})
export class NewFigureComponent implements OnInit {

  
file=null;



  constructor(private _figuresService: FiguresService,
    private _router: Router, private http:HttpClient) { }

  // the object with the data I will send to database to create a new figure
  // i set an empty parameter tha doesn't exist in the form of the html
  figureData = {
    'creator': ''
  };

  // the univers available in the select
  univers = ['Disney', 'Marvel', 'Lord of the rings'];

  uploadFile(event){
    var img = new Image();// Create a new image.
    console.log(event.target.files[0])
    var reader = new FileReader(); // usieng API that alows me to slide in files
    
      
     
     
      this.file = event.target.files[0];// I check the files
  
      reader.onload = function() { // whene action over do this
                  console.log("toto")
                  
                  img.id="uployed_image";  // Set the img src property using the data URL.
                  img.src = reader.result;
        console.log(reader.result)
        
        
    
  }
  if (this.file) {
    reader.readAsDataURL(this.file);
  }
  this._figuresService.newFigure(img)
  .subscribe(
  res => {
    this._router.navigate(['/figures']);
    console.log(res);
  },
  err => console.log(err)
  );
}
  
  // new figures doesn't belong to connected user but to its creator.
  // newFigure() {
  //   const creator = localStorage.getItem('id');

  //   this.figureData.creator = creator;
  //   this._figuresService.newFigure(img)
  //     .subscribe(
  //     res => {
  //       this._router.navigate(['/figures']);
  //       console.log(res);
  //     },
  //     err => console.log(err)
  //     );
  // }


  ngOnInit() {
  }

}
