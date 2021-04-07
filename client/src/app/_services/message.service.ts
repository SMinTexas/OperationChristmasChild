import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  addCategory: string = "Add a New Product Category";
  updateCategory: string = "Update a Product Category";
  addInventory: string = "Add a New Inventory Item";
  updateInventory: string = "Update an Inventory Item";
  registerUser: string = "Register a New User";
  loginUser: string = "Login";

  constructor(private toastr: ToastrService) { }

  addCategorySuccessMsg(category: string)
  {

    this.toastr.success("A new product category, " + category + ", was successfully added.", this.addCategory);
  }

  addCategoryErrorMsg(error: any)
  {
    this.toastr.error(error.url + ": RETURNED HTTP response code " + error.status, this.addCategory);
  }

  updateCategorySuccessMsg(category: string)
  {
    this.toastr.success("Category " + category + " was successfully updated.", this.updateCategory);
  }

  updateCategoryErrorMsg(error: any)
  {
    this.toastr.error(error.url + ": RETURNED HTTP response code " + error.status, this.updateCategory);
  }

  addInventorySuccessMsg(item: string)
  {
    this.toastr.success("New item - " + item + " - was successfully added to your inventory list.", this.addInventory);
  }

  addInventoryErrorMsg(error: any)
  {
    this.toastr.error(error.url + ": RETURNED HTTP response code " + error.status, this.addInventory);
  }

  updateInventorySuccessMsg(item: string)
  {
    this.toastr.success("Item " + item + " was successfully updated.", this.updateInventory);
  }

  updateInventoryErrorMsg(error: any)
  {
    this.toastr.error(error.url + ": RETURNED HTTP response code " + error.status, this.updateInventory);
  }

  registerSuccessMsg(name: string)
  {
    this.toastr.success("New user, " + name + ", successfully registered.", this.registerUser);
  }

  registerErrorMsg(error: any)
  {
    this.toastr.error(error.url + ": RETURNED HTTP response code " + error.status, this.registerUser);
  }

  loginErrorMsg(error: any)
  {
    this.toastr.error(error.url + ": RETURNED HTTP response code " + error.status, this.loginUser);
  }
}
