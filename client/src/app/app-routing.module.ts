//Angular components
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Authorization guard
import { AuthGuard } from './_guards/auth.guard';

//Home component
import { HomeComponent } from './home/home.component';

//Dashboard component
import { DashboardComponent } from './dashboard/dashboard.component';

//Lookup Data components
import { AgeRangeComponent } from './ages/age-range/age-range.component';
import { GenderComponent } from './genders/gender/gender.component';

//Product Category components
import { AddProductCategoryComponent } from './categories/add-product-category/add-product-category.component';
import { ProductCategoriesComponent } from './categories/product-categories/product-categories.component';

//Inventory components
import { InventoryAddComponent } from './inventory/inventory-add/inventory-add.component';
import { InventoryEditComponent } from './inventory/inventory-edit/inventory-edit.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';

//Error components
import { BadRequestComponent } from './errors/bad-request/bad-request.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'inventories', component: InventoryListComponent},
      {path: 'inventories/add', component: InventoryAddComponent},
      {path: 'inventory/edit/:id', component: InventoryEditComponent},
      {path: 'categories', component: ProductCategoriesComponent},
      {path: 'categories/:category', component: ProductCategoriesComponent},
      {path: 'categories/add', component: AddProductCategoryComponent},
      {path: 'ages', component: AgeRangeComponent},
      {path: 'genders', component: GenderComponent}
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'bad-request', component: BadRequestComponent},
  {path: 'auth', component: UnauthorizedComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
