import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../Services/customer.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logInForm:FormGroup;
  signUpForm:FormGroup;
  isLoading = false;
  

  constructor(private _snackBar: MatSnackBar,
    private customerService:CustomerService,
    private router:Router,
    public authService:AuthServiceService){}

  ngOnInit(): void {
   this.logInForm = new FormGroup({
    email :new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    entity:new FormControl("Customer",Validators.required)
   })

   this.signUpForm = new FormGroup({
    full_name:new FormControl(null,[Validators.required]),
    email :new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    entity:new FormControl("Customer",Validators.required)
   })
  
  } 

  showSnackBar(message:string,duration:number){
    this._snackBar.open(message, "Close", {
      duration: duration, 
    });
  }

  login(){
    this.isLoading = true;
   if(!this.logInForm.valid){
    this.showSnackBar("Please Enter Valid Details",2000);
    this.isLoading = false;
   }

   else{
    this.isLoading = true;
    const email = this.logInForm.get('email')?.value;
    const password = this.logInForm.get('password')?.value;
    const entity = this.logInForm.get('entity')?.value;
    if(entity === "Customer"){
      //################## FOR CUSTOMER ########################
    const user = this.customerService.getCustomer().find(
      customer =>customer.email === email
      )
      if (user) {
        if (user.password === password) {
          this.authService.loggedIn = email;
          this.isLoading = false;
          this.router.navigate(['/dashboard'])
        } else {
          
          this.showSnackBar("Invalid Credientials",2000);
          this.isLoading = false;
        }
      } else {
        this.showSnackBar("Invalid Credientials",2000);
        this.isLoading = false;

      }
    
   }
   else{
      //################## FOR CUSTOMER ########################
    }
    this.isLoading = false;
   }
  }
  
  signUp(){
    
    if(!this.signUpForm.valid){
      this.showSnackBar("Please Enter Valid Details",2000);
     }

     else{
      const full_name = this.signUpForm.get('full_name')?.value;
      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('password')?.value;
      const entity = this.signUpForm.get('entity')?.value;
      if(entity ==="Customer"){
        const user = this.customerService.getCustomer().find(
          user=> user.email === email
        )
        if(user){
          this.showSnackBar("User Already Exist",2000);
          this.signUpForm.reset();
        }
        else{
        this.customerService.addCustomer(full_name,email,password);
        this.router.navigate(['/dashboard'])
        }
      }
     }
  }


}
