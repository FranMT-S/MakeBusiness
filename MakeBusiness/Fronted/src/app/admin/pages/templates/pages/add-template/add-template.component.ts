import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss']
})
export class AddTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fieldNotValid(field:string){
    // return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  save(){

    // console.log(this.myForm.valid)
    // console.log(this.myForm.value)
  }

}
