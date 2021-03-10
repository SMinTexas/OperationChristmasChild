import { DecimalPipe } from "@angular/common";

export interface UserInventory {
    appUserId: number;
    userName: string;
    inventoryId: number;
    item: string;
    itemDescription: string;
    itemPrice: number;
    itemCount: number;
    ageRange: string;
    gender: string;
    bestPrice: number;
    lastPurchasedDate: Date;
    notes: string;
    productCategoryId: number;
}