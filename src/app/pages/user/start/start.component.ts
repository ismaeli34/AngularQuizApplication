import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid:any;
  questions:any;

  marksGot =0;
  correctAnswers=0;
  attempted=0;  
  isSubmit = false;
  timer:any;
  constructor(private locationSt:LocationStrategy, 
    private route:ActivatedRoute,
    private _question:QuestionService
    ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this.route.snapshot.params['qid'];
    console.log('qid',this.qid);
    this.loadQuestions();
  }
  loadQuestions() {
    this._question.getQuestionForTest(this.qid).subscribe((data:any)=>{
      this.questions = data;
      this.timer=this.questions.length * 2 * 60;
      this.questions.forEach((q:any)=>{
        q['givenAnswer']='';
      })
            console.log(this.questions);
            this.startTimer();

    },

    (error)=>{
      console.log("error");
      Swal.fire("Error","Error in Loading questions of Quiz",'error')
    }
    
    
    )
  }

  preventBackButton(){
    history.pushState(null,"null",location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,"null",location.href);
    })
  }


  submitQuiz(){

    Swal.fire({
      title: 'Do you want to submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //calculation
        this.evalQuiz();

      } 
      else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })


  }

  startTimer(){
   let t= window.setInterval(()=>{
      //code
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);

  }

  getFormattedTime(){
    let minutes = Math.floor(this.timer/60);
    let seconds = this.timer - minutes * 60;
    return `${minutes} min : ${seconds} sec`
  }

  evalQuiz(){

    this._question.evalQuiz(this.questions).subscribe((data:any)=>{
      console.log(data);
      this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers = data.correctAnswers;
      this.attempted = data.attempted;
      this.isSubmit = true;
    } 
    ,
    (error:any)=>{
      console.log(error);
    }
    )

    //     this.questions.forEach((q:any)=>{
    //       if(q.givenAnswer ==q.answer){
    //         this.correctAnswers++;
    //         let marksSingle= this.questions[0].quiz.maxMarks/this.questions.length;
    //         this.marksGot += marksSingle;

    //       }
          
    //       if(q.givenAnswer.trim()!=''){
    //         this.attempted++;
    //       }
    //     });

    //     console.log("Correct answers",+this.correctAnswers);
    //     console.log("Marks got"+ this.marksGot);
    //     console.log("attempted"+ this.attempted);
  }

  printPage(){
    window.print();
  }

}
