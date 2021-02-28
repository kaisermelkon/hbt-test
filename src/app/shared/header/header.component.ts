import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public siteLanguage = 'English'

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    
  }

  useLanguage(language: string) {
    this.translate.use(language);
    language === 'es' ? this.siteLanguage = 'Spanish' : this.siteLanguage = 'English'
  }

}
