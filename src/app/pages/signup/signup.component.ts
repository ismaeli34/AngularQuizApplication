import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,
    private snackBar: MatSnackBar) { }

  public user ={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''

  }

  ngOnInit(): void {
  }

  formSubmit(){

    console.log(this.user)
    if(this.user.username==''|| this.user.username ==null){
      // alert("User is required")
      this.snackBar.open("Username is required !!",'Ok',{
        duration:3000 
      });
      return;
    }

    //addUser

    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //sucess
        Swal.fire('Success done','User id is ' + data.id, 'success');
      },
      (error)=>{
        console.log(error);
        alert('something went wrong');
        this.snackBar.open('Something went wrong','',{
          duration:3000
        })
      }
    );
  }

}
