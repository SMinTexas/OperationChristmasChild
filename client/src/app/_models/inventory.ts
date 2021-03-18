export interface Inventory {
    inventoryId: number;
    item: string;
    itemDescription: string;
    itemPrice: number;
    itemCount: number;
    ageRange: string;
    gender: string;
    bestPrice: number;
    lastPurchasedDate: Date;
    notes: Text;
    appUserId: number;
    productCategoryId: number;
    category: string;
}