import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HotelsService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getAllHotels() {
    return this.http.get('/api/hotels')
      .map(res => res.json());
  }
}
