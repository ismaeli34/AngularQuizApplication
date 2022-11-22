import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:Quiz[]=[];;

  // quizzes = [
  //   {
  //     qId:23,
  //     title:'Basic Java quiz',
  //     description:'Core Java covers the basic concepts of the Java programming language.',
  //     maxMarks:50,
  //     numberOfQuestions:'20',
  //     active:'',
  //     category:{
  //       title: 'Programming'
  //     }
  //   },
  //   {
  //     qid:23,
  //     title:'Basic Java quiz',
  //     description:'Core Java covers the basic concepts of the Java programming language.',
  //     maxMarks:50,
  //     numberOfQuestions:'20',
  //     active:'',
  //     category:{
  //       title: 'Programming'
  //     }
  //   },
  //   {
  //     qid:23,
  //     title:'Basic Java quiz',
  //     description:'Core Java covers the basic concepts of the Java programming language.',
  //     maxMarks:50,
  //     numberOfQuestions:'20',
  //     active:'',
  //     category:{
  //       title: 'Programming'
  //     }
  //   }
  // ]

  constructor(private quiz:QuizService) { }

  ngOnInit(): void {


    this.quiz.quizzes().subscribe((data:any)=>{
      this.quizzes=data;
      console.log(this.quizzes);
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!","Server Error","error");
    }
    );



    
  
  }


  /**
   * 
   * @param qId delete quiz
   */
  deleteQuiz(qId:any){


    Swal.fire({
      icon:'warning',
      title:"Are you sure ?",
      confirmButtonText:'Delete',
      showCancelButton:true

    }).then((result)=>{
      if(result.isConfirmed){
        //delete
    this.quiz.deleteQuiz(qId).subscribe(
      (data)=>{
        this.quizzes=this.quizzes.filter((quiz)=>quiz.qId != qId);
        Swal.fire('Success','Quiz deleted','success');
      },
      (error)=>{
        Swal.fire('Error','Error in deleting quiz','error');
      }
    );
      }
    })



  }
}
