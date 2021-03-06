import { CategoryCount } from "./categoryCount";

export interface Dashboard {
    appUserId: number;
    gender: string;
    ageRange: string;
    averagePrice: number;
    totalCount: number;
    categories: CategoryCount[];
}