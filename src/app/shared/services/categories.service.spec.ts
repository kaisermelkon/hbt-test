import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesService]
    });
    service = TestBed.inject(CategoriesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all categories', () => {
    service.getCategories()
        .subscribe(categories => {
            expect(categories.elements).toBeTruthy('No categories returned');
            expect(categories.elements.length).toBe(3,
                "incorrect number of categories");
        });
    const req = httpTestingController.expectOne('https://run.mocky.io/v3/23fa7d8a-4e31-4840-8e6f-f41444cfd361');
    expect(req.request.method).toEqual("GET");

  });
});
