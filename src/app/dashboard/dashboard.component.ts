import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/auth-service.service';
import { CustomerService } from '../Services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
   user:any 

constructor(private authService:AuthServiceService,
            private customerService:CustomerService){}

  ngOnInit(): void {
    const email = this.authService.loggedIn;
    this.user= this.customerService.getCustomer().find(
      user=> user.email === email
    )


  }
 
}
