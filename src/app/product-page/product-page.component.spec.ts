import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductPageComponent } from './product-page.component';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPageComponent ],
      imports: [RouterTestingModule.withRoutes([{path: 'home', component: ProductPageComponent}]),]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build chart', () => {
    spyOn(component, 'buildChart').and.callThrough();
    let product: any = {name: 'TShirt',price: 15, availability: true, quantitySold: 5,category: 'Cloth', historicalPrices: [{date: "90", price: 34}, {date: "89", price: 45}]}
    expect(component.buildChart(product)).toEqual(product.name)
  });
});
