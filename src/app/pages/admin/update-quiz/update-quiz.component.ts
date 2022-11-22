import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute, 
    private _quiz:QuizService,
    private _category:CategoryService,
    private router:Router
    ) { }

  qId = 0;
  color: ThemePalette = 'accent';
  categories:any;



  quizData = {
    title: '',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },


  };

  ngOnInit(): void {
   this.qId= this._route.snapshot.params['qid'];
  //  alert(this.qId)
  this._quiz.getQuiz(this.qId).subscribe((data:any)=>{
    this.quizData = data;
    console.log(this.quizData);
  },
  (error)=>{
console.log(error);
  }
  );

  this._category.categories().subscribe((data:any)=>{
    this.categories = data;
  },
  (error)=>{

    alert('error in loading categories');
  }
  )

  }



  //update form submit

  public updateData(){
    //validate data
    
    this._quiz.updateQuiz(this.quizData).subscribe((data)=>{
      Swal.fire("Sucess!!",'quiz is updated','success').then((e)=>{
        this.router.navigate(['/admin/quizzes']);
      });
    },
    (error)=>{
      Swal.fire('Error','error in updating quiz','error');
      console.log(error);

    }
    );
  }

}
