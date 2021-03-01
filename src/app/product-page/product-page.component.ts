import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HistoricalPricesModel } from '../shared/models/historicalPrices.model';
import { ProductModel } from '../shared/models/product.model';
import { ShareDataService } from '../shared/services/share-data.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  public product!: ProductModel;

  public dataSet: any[] = 
  [{
    name: 'Cyan',
    series: [
    ]
  }];

  view: any[number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Price';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor(private dataService: ShareDataService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.dataSet)
    if(!this.dataService.selectedItem){
      this.router.navigate(['/home']);
    }
    else{
      this.product = this.dataService.selectedItem 
      console.log(this.product)
      this.buildChart(this.product)
    }
  }

  buildChart(product: any){
    this.dataSet[0].name = product.name
    product.historicalPrices.forEach((ele: HistoricalPricesModel)=> this.dataSet[0].series.push({name: ele.date, value: ele.price}))
    return this.dataSet[0].name
  }

}
