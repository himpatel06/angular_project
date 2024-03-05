import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private count = 4;
   private customer=[
    {c_id:1,
    full_name:'himang patel',
    email:'himang@gmail.com',
    password:'123456'
  },
  {c_id:2,
    full_name:'Aastha patel',
    email:'aastha@gmail.com',
    password:'123456'
  },
  {c_id:3,
    full_name:'Rakesh patel',
    email:'rakesh@gmail.com',
    password:'123456'
  },
]
  private user=[];
  constructor(private http:HttpClient) { }

  getCustomer(email?:string,password?:string){
    this.http.post('https://localhost:3000/v1/auth/login',{email,password,'entity':'Costomer'})
    return this.customer;
  }
  addCustomer(full_name:string,email:string,password:string){
    const user = {
      c_id:this.count++,
      full_name,
      email,
      password,
    }
    this.customer.push(user)
  }
}
