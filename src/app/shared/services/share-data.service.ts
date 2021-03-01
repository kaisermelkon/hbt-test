import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public selectedCountry = new BehaviorSubject<string>("UnitedStatesOfAmerica");
  public currentCountry = this.selectedCountry.asObservable();

  /*Note: It would be better to create a get endpoint that brings the product by the id instead of passing the data in home to keep
  the data as consistent with the db as possible but given the limitations of the api mock this method is used in this test*/
  public selectedItem: any = null;

  constructor() { }

  changeCountry(country: string){
    this.selectedCountry.next(country) 
  }

  changeSelectedItem(item: any){
   this.selectedItem = item;
  }
}
