import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public selectedCountry = ''

  constructor() { }

  changeCountry(country: string){
    this.selectedCountry = country
  }
}
