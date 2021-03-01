import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public products: Array<any> = [
    {
      name: 'PoloShirt',
      photo: 'https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg',
      price: 45,
      availability: true,
      category: 'Cloth',
      historicalPrices: [
        {
          date: '20/02/2021',
          price: 38
        },
        {
          date: '21/02/2021',
          price: 38
        },
        {
          date: '22/02/2021',
          price: 45
        },
      ]
    },
    {
      name: 'Towel',
      photo: 'https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg',
      price: 30,
      availability: false,
      category: 'House',
      historicalPrices: [
        {
          date: '20/02/2021',
          price: 24
        },
        {
          date: '21/02/2021',
          price: 23
        },
        {
          date: '22/02/2021',
          price: 38
        },
      ]
    }
  ]

  public categories: Array<string> = ['Cloth', 'House', 'Electronics'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (response)=>{
        console.log(response)
      }
    )
  }

}
