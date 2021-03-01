import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = `https://run.mocky.io/v3/`;

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}623b449e-cf84-4e8e-948f-dd474394befa`);
  }
}
