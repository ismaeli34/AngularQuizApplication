import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId:any;
  qTitle:any;
  questions =[];
  constructor(private route:ActivatedRoute, 
    private router:Router,  
    private _questionService:QuestionService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qId'];
    this.qTitle = this.route.snapshot.params['title'];
    console.log(this.qId);
    console.log(this.qTitle);

    this._questionService.getQuestionOfQuiz(this.qId).subscribe((data:any)=>{
      console.log("List",data);
      this.questions = data;
    },
    (error)=>{
      console.log(error);
    }
    )
  }

  //delete questions

  updateQuestion(qid:any){
    this.router.navigate(['/update-question',qid])
    
  }

  deleteQuestion(questionId:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you Sure , You want to delete this question ?'
    }).then((result)=>{
      if(result.isConfirmed){
        this._questionService.deleteQuestion(questionId).subscribe((data:any)=>{
          this.snackBar.open('Question deleted','',{
            duration:3000
          });
          this.questions = this.questions.filter(
            (q)=>{
              console.log("question id",(q['quesId']));
              q['quesId']!=questionId  
            }


            )

        },
        (error)=>{
          this.snackBar.open('Error in deleting questions','',{
            duration:3000
          })
          console.log(error);
        }
        )
      }
    })

  }



}
