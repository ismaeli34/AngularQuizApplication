import { Category } from "./category.model";

export class Quiz {
    qId?:number;
     active?:boolean;
     title?:string;
     description?:string;
     maxMarks?:string;
     numberOfQuestions?: number;

   
        category?:Category = new Category();

    


}