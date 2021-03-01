import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ShareDataService } from '../services/share-data.service';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [TranslateModule.forRoot(), RouterTestingModule.withRoutes([]),],
      providers: [ShareDataService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change country', () => {
    spyOn(component, 'selectCountry').and.callThrough();
    const e = fixture.debugElement.nativeElement.querySelectorAll('.dropdown-item');
    e[0].click();
    expect(component.selectCountry).toHaveBeenCalledWith('Colombia');
    expect(component.selectedCountry).toBe('Colombia');
  });
});
