import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable()

export class AuthService {

  // i set the url on wich I will cal the http requests
  private _registerUrl = "http://localhost:8080/users";
  private _loginUrl = "http://localhost:8080/users";
  private _profilUrl = "http://localhost:8080/users";
  private headers = new HttpHeaders({'Content-Type': 'application/json'});



  constructor(private http: HttpClient,
    private _router: Router) {
  }

  // post httprequest that send the user datas to database on register url
  registerUser(registerUserData) {
    this.headers.append('Access-Control-Allow-Origin', '*');
		this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    return this.http.post<any>(this._registerUrl, registerUserData, {headers: this.headers});

  }

 

  // post httprequest that send the user datas to database on login url
  loginUser(email,password) {
    this.headers.append('Access-Control-Allow-Origin', '*');
		this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    return this.http.get<any>(this._loginUrl + '/' + email + '/' + password)
  }

  // function that check if there is an id in local storage
  loggedIn() {
    return !!localStorage.getItem('id')//!! asks true or false answer
  }


  // function that remove the local storage items and open the figures page
  logoutUser() {
    localStorage.removeItem('id')
    localStorage.removeItem('figure_name')
    this._router.navigate(['/figures'])
  }

  // post httprequest that send the new user datas to database on profil url
  modifUser(user) {
    this.headers.append('Access-Control-Allow-Origin', '*');
		this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    return this.http.put<any>(this._profilUrl, user, {headers: this.headers}
      )
  }


  // delete httprequest thats send the user id to database on profil url
  deleteUser(id) {
    console.log(localStorage.getItem('id'));
    return this.http.delete<any>(this._profilUrl + id)
  }
}
