import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  

public loginForm!:FormGroup;
  public invalid!:boolean;
  constructor(private formBuilder:FormBuilder,private router:Router){
    localStorage.clear()
  }
  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  login():void{
    if(this.loginForm.valid){
      alert("Login Success");
    console.log(this.loginForm.value)
    localStorage.setItem('token',"eyvcbfghjkilah,lsgkilhsffsjjdhgdhdjudjnjhsnsjsujnnmki")
    this.loginForm.value.email=="admin@gmail.com" ?localStorage.setItem('userType','admin'):localStorage.setItem('userType','user')
    this.router.navigate(['managerDashboard'])
    }
  }
  
}
  

