export interface Inventory {
    item: string;
    itemDescription: string;
    itemPrice: number;
    itemCount: number;
    bestPrice: number;
    lastPurchasedDate: Date;
    notes: Text;
    userId: number;
    categoryId: number;
    ageId: number;
    genderId: number;
}