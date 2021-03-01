import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor(private http: HttpClient) { }

  public getCategories(): Observable<any> {
    return this.http.get(`${environment.baseUrl}23fa7d8a-4e31-4840-8e6f-f41444cfd361`);
  }
}