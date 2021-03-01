import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = `https://run.mocky.io/v3/`;

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get(`${environment.baseUrl}cb2bea6f-ed59-4329-8d83-b3ba5e7753e6`);
  }
}
