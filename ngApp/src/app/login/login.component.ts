import { Component, OnInit } from '@angular/core';

// auth service import to use the http equests and function specifics to authentification
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  // object with the form values
  loginUserData = {
    'email': '',
    'password': ''
  };

  // array with the user datas
  collectionneur = [];

  constructor(private _auth: AuthService,private _router: Router) {
  }

  ngOnInit() {
  }

   // check if user exist
   // sendback the user id
  loginUser() {
    this._auth.loginUser(this.loginUserData.email,this.loginUserData.password)
      .subscribe(
      res => {
        localStorage.setItem('id', res.userId);
        // this.collectionneur = res;

        this._router.navigate(['/figures']);
        console.log(res);
      },
      err => console.log(err)
      );

  }

}
