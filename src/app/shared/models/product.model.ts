import { HistoricalPricesModel } from "./historicalPrices.model";

export class ProductModel {
    name!: string;
    price!: number;
    photo!: string;
    availability!: boolean;
    category!: string;
    quantitySold!: number;
    historicalPrices!: HistoricalPricesModel[];
}