import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private router: Router) {

  }

  onSubmit() {
    console.log("username : "+this.username)
    console.log("password : "+this.password)

    this.router.navigate([''])
  }
}
