import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  public countries: Array<string> = ['Colombia', 'UnitedStatesOfAmerica', 'India']
  public selectedCountry: string = 'UnitedStatesOfAmerica'

  constructor(private router: Router, private shareData: ShareDataService) { }

  ngOnInit(): void {
  }

  selectCountry(country: string){
    this.selectedCountry = country;
    this.shareData.changeCountry(country)
    this.router.navigate(['/home']);
  }

}
