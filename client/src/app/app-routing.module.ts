import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductCategoryComponent } from './categories/add-product-category/add-product-category.component';
import { ProductCategoriesComponent } from './categories/product-categories/product-categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BadRequestComponent } from './errors/bad-request/bad-request.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { HomeComponent } from './home/home.component';
import { InventoryAddComponent } from './inventory/inventory-add/inventory-add.component';
import { InventoryEditComponent } from './inventory/inventory-edit/inventory-edit.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'inventory/list', component: InventoryListComponent},
      {path: 'inventory/add', component: InventoryAddComponent},
      {path: 'inventory/edit/:id', component: InventoryEditComponent},
      {path: 'categories', component: ProductCategoriesComponent},
      {path: 'product-category/add', component: AddProductCategoryComponent},
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
