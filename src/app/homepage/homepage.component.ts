import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { ProductService } from '../shared/services/product.service';
import { ShareDataService } from '../shared/services/share-data.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  public products: Array<any> = []

  private allProducts: Array<any> = []

  public categories: Array<string> = ['Cloth', 'House', 'Electronics'];

  constructor(private productService: ProductService, private categoriesService: CategoriesService, private shareData: ShareDataService) { }

  ngOnInit(): void {
    this.productService.getProducts().pipe(
      mergeMap((response: any) => {
        this.allProducts = response.elements;
        this.products = response.elements.filter((el: any)=> el.country === 'UnitedStatesOfAmerica')[0].products
        return this.shareData.selectedCountry
      }
    )).subscribe((res3) => {
      this.products = this.allProducts.filter((el: any)=> el.country === res3)[0].products
    });
    this.categoriesService.getCategories().subscribe(
      (response)=>{
        console.log(response)
        this.categories = response.elements.filter((el: any)=> el.country === 'UnitedStatesOfAmerica')[0].categories
      }
    )
  }

}
