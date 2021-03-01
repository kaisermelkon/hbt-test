import { ProductModel } from "./product.model";

export class ResponseProductServiceModel {
    elements!: [
        {
            country: string,
            products: ProductModel
        }
    ]
}