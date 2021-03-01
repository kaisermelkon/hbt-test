import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ProductService } from '../shared/services/product.service';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageComponent ],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule],
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
    let allProducts: any = [{country: 'Colombia', products: [{price: 15, availability: true, quantitySold: 5,category: 'Cloth'}, {price: 23, availability: true, quantitySold: 7,category: 'Home'},{price: 56, availability: false, quantitySold: 5,category: 'Electronics'}]},
    {country: 'UnitedStatesOfAmerica', products: [{price: 15, availability: true, quantitySold: 5,category: 'Cloth'}, {price: 23, availability: true, quantitySold: 7,category: 'School'},{price: 56, availability: false, quantitySold: 5,category: 'Electronics'}]}
    ]
    let products: any =  [{price: 15, availability: true, quantitySold: 5,category: 'Cloth'}, {price: 23, availability: true, quantitySold: 7,category: 'Home'},{price: 56, availability: false, quantitySold: 5,category: 'Electronics'}]
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
    let allProducts: any = [{country: 'Colombia', products: [{price: 15, availability: true, quantitySold: 5,category: 'Cloth'}, {price: 23, availability: true, quantitySold: 7,category: 'Home'},{price: 56, availability: false, quantitySold: 5,category: 'Electronics'}]},
    {country: 'UnitedStatesOfAmerica', products: [{price: 15, availability: true, quantitySold: 5,category: 'Cloth'}, {price: 23, availability: true, quantitySold: 7,category: 'School'},{price: 56, availability: false, quantitySold: 5,category: 'Electronics'}]}
    ]
    let products: any =  [{price: 15, availability: true, quantitySold: 5,category: 'Cloth'}, {price: 23, availability: true, quantitySold: 7,category: 'Home'},{price: 56, availability: false, quantitySold: 5,category: 'Electronics'}]
    let result = component.filterAllProductsByCountry(allProducts,  'Colombia')
    expect(result).toEqual(products)
  });

  it('should change products by availability', () => {
    spyOn(component, 'filterByAvailability').and.callThrough();
    component.availability = true;
    let products: any =  [{price: 15, availability: true, quantitySold: 5,category: 'Cloth'}, {price: 23, availability: true, quantitySold: 7,category: 'Home'},{price: 56, availability: false, quantitySold: 5,category: 'Electronics'}]
    expect(component.filterByAvailability(products).length).toBe(2)
    component.availability = false;
    expect(component.filterByAvailability(products)).toEqual(products)
  });

  it('should change available', () => {
    spyOn(component, 'changeAvailable').and.callThrough();
    component.availability = true;
    let allProducts: any = [{country: 'Colombia', products: [{price: 15, availability: true, quantitySold: 5,category: 'Cloth'}, {price: 23, availability: true, quantitySold: 7,category: 'Home'},{price: 56, availability: false, quantitySold: 5,category: 'Electronics'}]},
    {country: 'UnitedStatesOfAmerica', products: [{price: 15, availability: true, quantitySold: 5,category: 'Cloth'}, {price: 23, availability: true, quantitySold: 7,category: 'School'},{price: 56, availability: false, quantitySold: 5,category: 'Electronics'}]}
    ]
    let products: any =  [{price: 15, availability: true, quantitySold: 5,category: 'Cloth'}, {price: 23, availability: true, quantitySold: 7,category: 'Home'},{price: 56, availability: false, quantitySold: 5,category: 'Electronics'}]
    component.changeAvailable(products, 'Colombia', allProducts)
    expect(component.availability).toBe(false)
  });

  it('should accept filter', () => {
    spyOn(component, 'accept').and.callThrough();
    let products: any =  [{price: 15, availability: true, quantitySold: 5,category: 'Cloth'}, {price: 23, availability: true, quantitySold: 7,category: 'Home'},{price: 56, availability: false, quantitySold: 5,category: 'Electronics'}]
    expect(component.accept(products, 'Lowest Price')[0]).toEqual(products[0])
    expect(component.accept(products, 'Highest Price')[0]).toEqual(products[0])
    expect(component.accept(products, 'Best Selling')[0]).toEqual(products[0])

  });

});


