import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  loggedIn="himangpatel@gmil.com";

  constructor() { }
  isLoggedIn(): string | null{
    console.log("Is logged in " + this.loggedIn);
    return this.loggedIn;
  }
}
