import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username:'',
    password:''
  }

  constructor( private snackBar: MatSnackBar,private login: LoginService, private router:Router ) { }

  ngOnInit(): void {
  }

  
  formSubmit(){

    console.log("button clicked");

    if(this.loginData.username.trim()==''|| this.loginData.username == null){
      this.snackBar.open("username is required",'',{
        duration:3000
      })
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password ==null){
      this.snackBar.open("password is required !",'',{
        duration:3000
      })
      return;

    }

    //request to server

    this.login.generateToken(this.loginData).subscribe((data:any) => {
      console.log('sucess');

        console.log(data);
        //login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect .....ADMIN :admin-dashboard
            //redirect.....NORMAL :normal-dashboard
            if(this.login.getUserRole()=='ADMIN'){
              //ADMIN DASHBOARD
              // window.location.href='/admin';
              this.router.navigate(['admin'])
              this.login.loginStatusSubject.next(true);
            }else if(this.login.getUserRole()=='NORMAL'){
              //NORMAL USER DASHBOARD
              // window.location.href= '/user-dashboard';
              this.router.navigate(['user-dashboard/0'])
              this.login.loginStatusSubject.next(true);
            }else{
              this.login.logout();
            }
          }
        );

      },

      (error)=>{
        console.log("Error !");
        console.log(error);
        this.snackBar.open("Invalid details !! Try again ",'',{
          duration:3000
        })

      }
      
      
    )


 


  }



}
