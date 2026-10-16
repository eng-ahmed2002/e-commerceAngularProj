import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuth } from '../../services/user-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  formLog : FormGroup
  constructor(private fbd:FormBuilder,
    private auth:UserAuth,
    private router:Router
  ){
    this.formLog =fbd.group({
      "userName" :fbd.control(localStorage.getItem("Username")?localStorage.getItem("Username"):"",[Validators.pattern("^[a-zA-Z]{3,16}$"),Validators.required]),
      "passWord" : fbd.control(localStorage.getItem("Password")?localStorage.getItem("Password"):"",Validators.required),
      "rememberMe" :fbd.control(false)
    })
  }


  login(){
    // console.log("button clicked")
    this.auth.login(this.formLog.get("userName")?.value,this.formLog.get("passWord")?.value).subscribe(
      {next:(val)=>
        {
          console.log(this.formLog.get("rememberMe")?.value)
          if(this.formLog.get("rememberMe")?.value){
          localStorage.setItem("Username",this.formLog.get("userName")?.value)
          localStorage.setItem("Password",this.formLog.get("passWord")?.value)
        }
          localStorage.setItem("token",val.token)
          this.router.navigateByUrl("home")
        },
      error :(e)=>alert(e.error)
    }
    )
  }

  navToRegis(){
    this.router.navigateByUrl("register")
  }

  get Name(){
    return this.formLog.get("userName")
  }
}
