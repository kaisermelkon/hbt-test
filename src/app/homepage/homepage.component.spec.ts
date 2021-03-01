import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs/internal/observable/of';

import { ProductService } from '../shared/services/product.service';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageComponent ],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
      providers: [ProductService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change category', () => {
    spyOn(component, 'changeCategory').and.callThrough();
    const e = fixture.debugElement.nativeElement.querySelectorAll('.nav-link');
    e[1].click();
    expect(component.changeCategory).toHaveBeenCalledWith('Cloth');
    const i = fixture.debugElement.nativeElement.querySelectorAll('.nav-link');
    i[0].click();
    expect(component.changeCategory).toHaveBeenCalledWith('Cloth');
  });

  it('should filter all by country', fakeAsync(() => {
    productService.getProducts().subscribe(
      (res) =>{
        component.filterAllProductsByCountry('Colombia')
        expect(component.filterAllProductsByCountry).toHaveBeenCalledWith('Colombia');
        expect(component.filterAllProductsByCountry.length).toBe(12);
      }
    )
    tick();
  }));

});
