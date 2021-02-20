import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryAddComponent } from './inventory/inventory-add/inventory-add.component';
import { InventoryEditComponent } from './inventory/inventory-edit/inventory-edit.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'inventory-list', component: InventoryListComponent},
      {path: 'inventory-add', component: InventoryAddComponent},
      {path: 'inventory-edit/:id', component: InventoryEditComponent},
      {path: 'maintenance', component: MaintenanceComponent},
    ]
  },

  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
