import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable()
export class dataService {
  public url = 'https://jsonplaceholder.typicode.com/todos/1'

  constructor(public http: HttpClient) { }

  getData(){
    return this.http.get(this.url)
  }
}
