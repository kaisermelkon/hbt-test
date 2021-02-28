import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the value of language', () => {
    spyOn(component, 'useLanguage').and.callThrough();
    const e = fixture.debugElement.nativeElement.querySelectorAll('.dropdown-item');
    e[1].click();
    expect(component.useLanguage).toHaveBeenCalledWith('es');
    expect(component.siteLanguage).toBe('Spanish');
    e[0].click();
    expect(component.useLanguage).toHaveBeenCalledWith('en');
    expect(component.siteLanguage).toBe('English');
  });
});

