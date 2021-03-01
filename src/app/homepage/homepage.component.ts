import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { ProductService } from '../shared/services/product.service';
import { ShareDataService } from '../shared/services/share-data.service';
import { mergeMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  public products: Array<any> = []

  public availability: boolean = false;

  public country: string ='';

  public category: string = '';

  public allProducts: Array<any> = []

  public categories: Array<string> = ['Cloth', 'House', 'Electronics'];

  public form: FormGroup;

  constructor(private productService: ProductService, private categoriesService: CategoriesService, private shareData: ShareDataService, fb: FormBuilder) { 
    this.form = fb.group({
      sort: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().pipe(
      mergeMap((response: any) => {
        this.allProducts = response.elements;
        this.products = response.elements.filter((el: any)=> el.country === 'UnitedStatesOfAmerica')[0].products
        return this.shareData.selectedCountry
      }
    )).subscribe((res3) => {
      this.products = this.filterAllProductsByCountry(this.allProducts, res3)
      this.country = res3;
    });
    this.categoriesService.getCategories().subscribe(
      (response)=>{
        console.log(response)
        this.categories = response.elements.filter((el: any)=> el.country === 'UnitedStatesOfAmerica')[0].categories
      }
    )
  }

  changeCategory(category: any, products: any, country: any, allProducts: any){
    this.category = category;
    if(category === 'all'){
      products = this.filterAllProductsByCountry(allProducts, country)
    }else{
      products = this.filterAllProductsByCountry(allProducts, country).filter((el: any)=> el.category === category)
    }
    this.products = this.filterByAvailability(products);
  }

  filterAllProductsByCountry(allProducts: any, country: any){
    return allProducts.filter((el: any)=> el.country === country)[0].products
  }

  changeAvailable(products: any, country: any, allProducts: any){
    this.availability = !this.availability
    this.changeCategory(this.category || 'all', products, country, allProducts)
  }

  showAvailability(){
    return this.availability ? 'ShowAll' : 'ShowAvailable'
  }

  accept(products: any[], sort: any){
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

  filterByAvailability(products: any[]){
    return this.availability ? products.filter((product)=> product.availability === this.availability) : products
  }

}
