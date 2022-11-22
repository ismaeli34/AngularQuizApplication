import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  content:any;
  qId:any;
  qTitle: any;
  question= {
    quiz:{
      qid:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };



  constructor(private _route:ActivatedRoute,
    private questionService:QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.question.quiz['qid'] = this.qId;
    this.qTitle = this._route.snapshot.params['title'];
  }

  formSubmit(){
    if(this.question.content.trim()=='' || this.question.content == null || this.question.content == undefined){

      return;
    }
    if(this.question.option1.trim()=='' || this.question.option1 == null || this.question.option1 == undefined){

      return;
    }

    if(this.question.option2.trim()=='' || this.question.option2 == null || this.question.option2 == undefined){

      return;
    }

    if(this.question.answer.trim()=='' || this.question.answer == null || this.question.answer == undefined){

      return;
    }

    console.log("json",this.question);
    console.log("content before",this.question.content);

    // this.content=this.question.content.replace(/<\/?[^>]+>/gi, '')
    console.log("content after",this.content);

   this.question= {
      quiz:{
        qid:this.qId
      },
      content:this.question.content,
      option1:this.question.option1,
      option2:this.question.option2,
      option3:this.question.option3,
      option4:this.question.option4,
      answer:this.question.answer,
    };



    this.questionService.addQuestion(this.question).subscribe((data:any)=>{


      console.log(data);
      this.content=data['content'];
      console.log("content"+this.content);
      Swal.fire('Success','Question Added','success');
      this.question.content = '';
      this.question.option1 = '';
      this.question.option2 = '';
      this.question.option3 = '';
      this.question.option4 = '';
      this.question.answer = '';



    },
    (error)=>{
      Swal.fire('Error','Error in adding question', 'error');
    }
    )
    

  }

}
