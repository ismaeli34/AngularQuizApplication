import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid:any;
  quiz:Quiz = new Quiz();
  numberOfQuestion?:number;
  questionMarks?:number;
  totalMarks?:number;



  constructor(private _route:ActivatedRoute,
    private router:Router,
     private _quiz:QuizService)  {
    this.quiz.numberOfQuestions;


   }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    // console.log("qid",this.qid);
    this._quiz.getQuiz(this.qid).subscribe((data:any)=>{
      // console.log(data);
      this.quiz = data;
      this.numberOfQuestion= data['numberOfQuestions']*2
      this.totalMarks = data['maxMarks']/data['numberOfQuestions'];



    },
    (error)=>{
      console.log(error);
      alert("error in loading quiz data");

    }
    
    )
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to start the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't save`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/start/'+ this.qid])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

}
