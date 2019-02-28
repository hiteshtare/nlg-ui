import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public basepath = 'https://entry.dev15.na01.labs.omnipresence.io/api/nlg';

  constructor(public http: HttpClient) {
  }

  getSentences(noOfSamples: number, intent_type: string): Observable<Response> {
    // let headers = new HttpHeaders();
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // headers = headers.append('Accept', 'application/json');
    // headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');


    const url = `${this.basepath}/getSentences?no_of_samples=${noOfSamples}&type=${intent_type}`;

    return this.http.get(url).pipe(map((data: Response) => {
      return data;
    }));
  }

  getParaphrases(sentences): Observable<Response> {
    const url = `${this.basepath}/getParaphrases`;

    // let headers = new HttpHeaders();
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // headers = headers.append('Accept', 'application/json');
    // headers = headers.append('Content-Type', 'application/json');

    let body = {};
    body = {
      'sentences': sentences
    };

    return this.http.post(url, body).pipe(map((data: Response) => {
      return data;
    }));
  }
}
