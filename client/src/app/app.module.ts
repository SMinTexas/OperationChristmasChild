import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { InventoryAddComponent } from './inventory/inventory-add/inventory-add.component';
import { InventoryEditComponent } from './inventory/inventory-edit/inventory-edit.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { BadRequestComponent } from './errors/bad-request/bad-request.component';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductCategoriesComponent } from './categories/product-categories/product-categories.component';
import { AddProductCategoryComponent } from './categories/add-product-category/add-product-category.component';
import { AgeRangeComponent } from './ages/age-range/age-range.component';
import { GenderComponent } from './genders/gender/gender.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    InventoryListComponent,
    InventoryAddComponent,
    InventoryEditComponent,
    TestErrorsComponent,
    NotFoundComponent,
    BadRequestComponent,
    UnauthorizedComponent,
    ServerErrorComponent,
    DashboardComponent,
    ProductCategoriesComponent,
    AddProductCategoryComponent,
    AgeRangeComponent,
    GenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
