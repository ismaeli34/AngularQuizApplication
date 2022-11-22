import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catid:any;
  quizzes:any;

  constructor(private route:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
   this.route.params.subscribe((params)=>{
      this.catid =  this.route.snapshot.params['catId'] ;

      if(this.catid ==0){
        console.log("Load all the quiz");
        this._quiz.getActiveQuizzes().subscribe(
          (data:any)=>{
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error)=>{
            console.log(error);
            alert('error in loading all quizzes'); 
          }
        )
    
       }else{
         console.log("load specific quiz");
         this.quizzes = [];
         this._quiz.getActiveQuizzesOfCategory(this.catid).subscribe((data)=>{
          this.quizzes = data;
         },
         
         (error)=>{
          alert("error in loading data");
         }
         )
       }


   })


  }

}
