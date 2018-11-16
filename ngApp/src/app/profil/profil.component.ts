import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

// object will get the values set in the html
// id isn't set in the html so I create it before
  UserData = {
    'userId': '',
    'userNom': '',
    'userPrenom': '',
    'email': ''
  };

  constructor(private _auth: AuthService,
    private _router: Router,
    public http: HttpClient) { }

  ngOnInit() {
    const id = localStorage.getItem('id');
    this.UserData.userId = id;
    this._auth.getUser(id)
      .subscribe(
      res => {
        this.UserData=res;
        console.log(res);
      },
      err => console.log(err)
      );
  }

  // send new data to update the connected user datas
  modifUser() {
    const id = localStorage.getItem('id');
    this.UserData.userId = id;
    this._auth.modifUser(this.UserData)
      .subscribe(
      res => {
        this._router.navigate(['/collection']);
        console.log(res);
      },
      err => console.log(err)
      );

  }

  // remove the user from data base
  deleteUser() {
    const id = localStorage.getItem('id');

    this._auth.deleteUser(id)
      .subscribe(
      res => localStorage.removeItem('id'),
      err => console.log(err)
      );
    this._router.navigate(['/login']);
  }
}
