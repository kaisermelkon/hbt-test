import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all products', () => {
    service.getProducts()
        .subscribe(products => {
            expect(products.elements).toBeTruthy('No products returned');
            expect(products.elements.length).toBe(3,
                "incorrect number of products");
        });
    const req = httpTestingController.expectOne('https://run.mocky.io/v3/cb2bea6f-ed59-4329-8d83-b3ba5e7753e6');
    expect(req.request.method).toEqual("GET");

  });
});
