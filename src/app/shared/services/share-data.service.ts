import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public selectedCountry = new BehaviorSubject<string>("UnitedStatesOfAmerica");
  public currentCountry = this.selectedCountry.asObservable();

  constructor() { }

  changeCountry(country: string){
    this.selectedCountry.next(country) 
  }
}
