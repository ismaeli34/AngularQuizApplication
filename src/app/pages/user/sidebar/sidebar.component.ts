import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories:any;

  constructor(private cat:CategoryService, private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.cat.categories().subscribe((data:any)=>{
      this.categories = data;

    },
    (error)=>{
      this.snackbar.open("Error in loading categories from server,","",{
        duration:3000
      });
    }
    )
  }

}
