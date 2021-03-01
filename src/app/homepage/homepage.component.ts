import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public products: Array<any> = []

  public categories: Array<string> = ['Cloth', 'House', 'Electronics'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (response)=>{
        console.log(response)
        this.products = response.elements;
        console.log(this.products.length)
      }
    )
  }

}
