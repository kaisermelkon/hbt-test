import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { ProductService } from '../shared/services/product.service';
import { ShareDataService } from '../shared/services/share-data.service';
import { catchError, concatMap, mergeMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseCategoryServiceModel } from '../shared/models/responseCategoryService.model';
import { ResponseProductServiceModel } from '../shared/models/responseProductService.model';
import { ProductModel } from '../shared/models/product.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  public products: Array<ProductModel> =[];

  public availability: boolean = false;

  public country: string ='';

  public category: string = '';

  public allProducts: Array<any> = []

  public allCategories: Array<any> = []

  public categories: Array<any> = ['Cloth', 'House', 'Electronics'];

  public form: FormGroup;

  public searchWord: string = '';

  constructor(private productService: ProductService, private categoriesService: CategoriesService, private shareData: ShareDataService, fb: FormBuilder, private router: Router) { 
    this.form = fb.group({
      sort: ['', Validators.required]
    });
  }

  /*NOTE: Given the nature of the mock service it was not manage how it should be, 
  because the service doesn't change response according to headers or parameters the country filter had to be done
  in the front end instead of using an interceptor or changing the request accordingly and only receiving the
  products for that country, this way it is much more convoluted and inefficent. 
  In a real life application it is never managed this way. Even the filters could be managed thorugh a api request*/
  ngOnInit(): void {
    this.productService.getProducts().subscribe((response: ResponseProductServiceModel) => {
        this.allProducts = response.elements;
        this.products = Array(response.elements.filter((el: any)=> el.country === 'UnitedStatesOfAmerica')[0].products)
        this.categoriesService.getCategories().subscribe(
          (response: ResponseCategoryServiceModel)=>{
            this.shareData.selectedCountry.subscribe((res3)=>{
              this.country = res3;
              this.categories = response.elements.filter((el: any)=> el.country === res3)[0].categories
              this.changeCategory('all', this.products, res3, this.allProducts)
            })
          }
        )
      }
    )
  }

  changeCategory(category: string, products: Array<ProductModel>, country: string, allProducts: any){
    this.category = category;
    if(category === 'all'){
      products = this.filterAllProductsByCountry(allProducts, country)
    }else{
      products = this.filterAllProductsByCountry(allProducts, country).filter((el: any)=> el.category === category)
    }
    this.products = this.filterByAvailability(products);
  }

  filterAllProductsByCountry(allProducts: any, country: string){
    return allProducts.filter((el: any)=> el.country === country)[0].products
  }

  changeAvailable(products: Array<ProductModel>, country: string, allProducts: any){
    this.availability = !this.availability
    this.changeCategory(this.category || 'all', products, country, allProducts)
  }

  showAvailability(){
    return this.availability ? 'ShowAll' : 'ShowAvailable'
  }

  accept(products: Array<ProductModel>, sort: string){
    switch (sort) {
      case 'Lowest Price':
        products.sort((a,b)=> a.price - b.price)
        break;
      case 'Highest Price':
        products.sort((a,b)=> b.price - a.price)
        break;
      case 'Best Selling':
        products.sort((a,b)=> b.quantitySold - a.quantitySold)
        break;
    }
    return products;
  }

  filterByAvailability(products: Array<ProductModel>){
    return this.availability ? products.filter((product)=> product.availability === this.availability) : products
  }

  searchThis(category: string, products: Array<ProductModel>, country: string, allProducts: any){
    this.changeCategory(category || 'all', products, country, allProducts)
    this.products = this.products.filter((product: any)=> {
      let arrayelement = product.name.toLowerCase()
      return arrayelement.includes(this.searchWord)
    })
  }

  openDetail(product: any){
    this.shareData.changeSelectedItem(product)
    this.router.navigate([`/product/${product.name}`]);
    return product.name;
  }

}
