import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Records } from './Records';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class RecordDetailsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  API_BASE_URL = `https://api.spacexdata.com/v3/launches?`;

  constructor(
    private http: HttpClient, private readonly location: Location
  ) { }

  getFilteredData(queryParam): Observable<Records[]> {

    const url = this.API_BASE_URL + queryParam;
    this.location.go(queryParam.toString());

    return this.http.get<Records[]>(url)
      .pipe(
        tap(Records => console.log('Records retrieved!')),
        catchError(this.handleError<Records[]>('Get Space X data', []))
      );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
