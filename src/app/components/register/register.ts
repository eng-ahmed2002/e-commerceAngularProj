import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuth } from '../../services/user-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  formReg:FormGroup
  isMatch:boolean=false

  constructor(private fbd:FormBuilder,
    private auth:UserAuth,
    private router:Router
  ){
    {
    this.formReg =fbd.group({
      "userName" :fbd.control(localStorage.getItem("Username")?localStorage.getItem("Username"):"",
      [Validators.pattern("^[a-zA-Z]{3,16}$"),Validators.required]),
      "email":fbd.control("",[Validators.required,Validators.email]),
      "passWord" : fbd.control(localStorage.getItem("Password")?localStorage.getItem("Password"):"",
      [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]),
      "repass" : fbd.control("",Validators.required),
      "rememberMe": fbd.control(false)
      })
    }
  }


  register(){
    this.auth.register({
      "username":this.Name?.value,
      "email": this.formReg.get("email")?.value,
      "password": this.formReg.get("passWord")?.value,
      // "id":1
    }).subscribe({
      next:(val)=>{
        if(this.formReg.get("rememberMe")?.value){
          localStorage.setItem("Username",this.formReg.get("userName")?.value)
          localStorage.setItem("Password",this.formReg.get("Password")?.value)
        }
        // else{
        //   localStorage.removeItem("Username")
        //   localStorage.removeItem("Password")
        // }
        alert("register success")
        this.router.navigateByUrl("login")
      },
      error : (e)=> alert(e.error)
    })
  }

  navToLog(){
    this.router.navigateByUrl("login")
  }

  compare(){
    this.isMatch=this.formReg.get("passWord")?.value == this.formReg.get("repass")?.value
  }

  get Name(){
      return this.formReg.get("userName")
  }
  get email(){
      return this.formReg.get("email")
  }
}
