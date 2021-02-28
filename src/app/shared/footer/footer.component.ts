import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  public countries: Array<string> = ['Colombia', 'UnitedStatesOfAmerica', 'Peru', 'India']
  public selectedCountry: string = 'UnitedStatesOfAmerica'

  constructor() { }

  ngOnInit(): void {
  }

  selectCountry(country: string){
    this.selectedCountry = country;
  }

}
