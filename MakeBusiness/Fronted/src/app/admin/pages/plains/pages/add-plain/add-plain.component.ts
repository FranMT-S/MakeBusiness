import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-plain',
  templateUrl: './add-plain.component.html',
  styleUrls: ['./add-plain.component.scss']
})
export class AddPlainComponent implements OnInit {

  myForm:FormGroup = this.fb.group({
    name   : ["",[],[]],
    description: ["",[],[]],
    price: ["",[],[]],
    limitPage: ["",[],[]],
    limitProducts: ["",[],[]],
    limitFiles: ["",[],[]],
  });

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }


  save(){
    console.log(this.myForm.value)
  }
}
