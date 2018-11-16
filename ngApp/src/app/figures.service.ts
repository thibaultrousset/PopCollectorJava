import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable()
export class FiguresService {

  private _figuresUrl = 'http://localhost:8080/figurines';
  private _collectionUrl = 'http://localhost:8080/figurines/user';
  private _collectionRemoveUrl = 'http://localhost:8080/figurines/remove';
  private _wishListUrl = 'http://localhost:8080/figurines/user/wish';
  private _newFigureUrl = 'http://localhost:8080/newFigure';
  private _myFiguresUrl = 'http://localhost:8080/myFigures';
  private _updateFigureUrl = 'http://localhost:8080/updateFigure';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) {
  }

  // get httprequest that send the user id and a figures univers to database on figures url
  getFigures(univers) {
    if ('All'!=univers) {
      return this.http.get<any>(this._figuresUrl+'/'+univers);
    }else{
      return this.http.get<any>(this._figuresUrl);
    }
    
    
  }


  // post httprequest that send the user id and  figure name to database on figures url
  addFigure(body) {
    this.headers.append('Access-Control-Allow-Origin', '*');
		this.headers.append('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
    return this.http.put<any>(this._collectionUrl+'/'+body.userId +'/'+body.num,{headers:this.headers});
  }

    // post httprequest that send the user id and  figure name to database on figures url
   addFigureWish(body) {
    this.headers.append('Access-Control-Allow-Origin', '*');
		this.headers.append('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
    return this.http.put<any>(this._wishListUrl+'/'+body.userId +'/'+body.num,{headers:this.headers});
  }

  addFigure2(body) {
    return this.http.post<any>(this._wishListUrl, body);
  }



  // get httprequest that send the user id to database on collection url
  getCollec(id,univers) {
    // if ('All'!=univers) {
    //   return this.http.get<any>(this._figuresUrl + '/' + id+'/'+univers);
    // }else{
      return this.http.get<any>(this._figuresUrl + '/' + id + '/'+univers);
    //}
  }

   // get httprequest that send the user id to database on wish-list url
   getWishList(id) {
    return this.http.get<any>(this._wishListUrl + '/' + id);
  }


  // put httprequest that send the user id and a figure name to database on collection url
  removeFigure(body) {
    let params = new HttpParams()
    .set('num', body.figureId);
    console.log(params);
    const id = localStorage.getItem('id');
    this.headers.append('Access-Control-Allow-Origin', '*');
		this.headers.append('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
    return this.http.put<any>(this._collectionRemoveUrl+'/'+body.userId +'/'+body.figureId,{headers:this.headers});
  }

  removeFigureWish(body) {
    return this.http.put<any>(this._wishListUrl, body);
  }


  // post httprequest that send the user id and  figures data univers to database on new figures url
  newFigure(file) {
    let params = new HttpParams()
    .set('file', file);
    return this.http.post<any>(this._newFigureUrl, {params:params});
  }


  // put httprequest that send the user id and a figure name to database on my figures url
  removeMyFigure(body) {
    return this.http.put<any>(this._myFiguresUrl, body);
  }


  // get httprequest that send the user id to database on my figures url
  getMyFigures(id) {
    return this.http.get<any>(this._myFiguresUrl + '/' + id);
  }


  // post httprequest that send the user id and  figures datas to database on update figure url
  updateFigure(body) {
    return this.http.post<any>(this._updateFigureUrl, body);
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 9) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);
 
        // ensure current page isn't out of range
        if (currentPage < 1) { 
            currentPage = 1; 
        } else if (currentPage > totalPages) { 
            currentPage = totalPages; 
        }
         
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
 
            
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}
