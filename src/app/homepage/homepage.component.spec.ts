import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AllProductsMock } from '../shared/mocks/allProducts.mock';
import { ProductsMock } from '../shared/mocks/products.mock';

import { ProductService } from '../shared/services/product.service';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageComponent ],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule, FormsModule, RouterTestingModule.withRoutes([]), ],
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
    let allProducts: any = AllProductsMock
    let products: any =  ProductsMock
    const e = fixture.debugElement.nativeElement.querySelectorAll('.nav-link');
    e[1].click();
    expect(component.changeCategory).toHaveBeenCalled()
    component.changeCategory('all', products, 'Colombia', allProducts)
    expect(component.products).toEqual(products)
  });

  it('should show availability', () => {
    spyOn(component, 'showAvailability').and.callThrough();
    const e = fixture.debugElement.nativeElement.querySelectorAll('.checkbox');
    e[0].click();
    expect(component.availability).toBe(true)
  });

  it('should change products by country', () => {
    spyOn(component, 'filterAllProductsByCountry').and.callThrough();
    let allProducts: any = AllProductsMock
    let products: any =  ProductsMock
    let result = component.filterAllProductsByCountry(allProducts,  'Colombia')
    expect(result).toEqual(products)
  });

  it('should change products by availability', () => {
    spyOn(component, 'filterByAvailability').and.callThrough();
    component.availability = true;
    let products: any =  ProductsMock
    expect(component.filterByAvailability(products).length).toBe(2)
    component.availability = false;
    expect(component.filterByAvailability(products)).toEqual(products)
  });

  it('should change available', () => {
    spyOn(component, 'changeAvailable').and.callThrough();
    component.availability = true;
    let allProducts: any = AllProductsMock
    let products: any =  ProductsMock
    component.changeAvailable(products, 'Colombia', allProducts)
    expect(component.availability).toBe(false)
  });

  it('should accept filter', () => {
    spyOn(component, 'accept').and.callThrough();
    let products: any =  ProductsMock
    expect(component.accept(products, 'Lowest Price')[0]).toEqual(products[0])
    expect(component.accept(products, 'Highest Price')[0]).toEqual(products[0])
    expect(component.accept(products, 'Best Selling')[0]).toEqual(products[0])
  });

  it('should change value', () => {
    spyOn(component, 'searchThis').and.callThrough();
    const inputDe = fixture.debugElement.query(By.css('input[name="searchWord"]'));
    const inputEl = inputDe.nativeElement;
    inputEl.value = 'Updated Task 1';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.searchWord).toBe('')
  });

  it('should seacrh this', () => {
    spyOn(component, 'searchThis').and.callThrough();
    let products: any =  ProductsMock
    let allProducts: any = AllProductsMock
    component.searchThis('all', products, 'Colombia', allProducts)
    expect(component.products).toEqual(products)
  });

});


