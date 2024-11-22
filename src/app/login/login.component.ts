import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Shared/api.service';
import { loginModel } from './loginModel';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  loginObj: loginModel = new loginModel();
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private api: ApiService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    })
  }
  login() {
    this.http.post<any>("http://localhost:3000/login", this.loginForm.value).subscribe(
      res => {
        localStorage.setItem("user", JSON.stringify( res.data));
        localStorage.setItem("email", JSON.stringify( res.data.email));
        localStorage.setItem("fullname", JSON.stringify( res.data.fullname));
        localStorage.setItem("phone", JSON.stringify( res.data.mobile));
        alert("Login Success");
        this.loginForm.reset();
        this.router.navigate(['userDasboard']);
      },
      err => {
        alert("Something went wrong");
      }
    );
  }
  // login() {
  //   this.http.get<any>("http://localhost:3000/login")
  //     .subscribe(res => {
  //       const user = res.find((a: any) => {
  //         return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
  //       });
  //       if (user) {
  //         alert("Login Success");
  //         this.loginObj.email = this.loginForm.value.email;
  //         this.loginObj.password = this.loginForm.value.password;
  //         this.api.postLogin(this.loginObj)
  //           .subscribe(res => {
  //             console.log(res);
  //             // alert("Booked successfully");

  //           }, err => {
  //             alert("something went wrong");
  //           })
  //         this.loginForm.reset();
  //         this.router.navigate(['userDasboard']);
  //       }
  //       else {
  //         alert("User not found");
  //       }
  //     }, err => {
  //       alert("Something went wrong");
  //     })
  // }

};
