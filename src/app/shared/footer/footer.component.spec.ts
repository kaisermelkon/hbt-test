import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [TranslateModule.forRoot()]
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
