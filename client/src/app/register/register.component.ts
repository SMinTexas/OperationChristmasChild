import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { MessageService } from '../_services/message.service';
import { Register } from '../_models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerUser: Register = new Object() as Register;

  constructor(
    private accountService: AccountService, 
    private messageService: MessageService) { }

  ngOnInit(): void { }

  register()
  {
    this.accountService.register(this.registerUser).subscribe(response => {
      this.messageService.registerSuccessMsg(this.registerUser.username);
      this.cancel();
    }, error => {
      this.messageService.registerErrorMsg(error);
    })
  }

  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
