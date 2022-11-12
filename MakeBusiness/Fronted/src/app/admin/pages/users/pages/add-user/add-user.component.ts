import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  myForm:FormGroup = this.fb.group({
    name   : ["",[],[]],
    password: ["",[],[]],
    mail: ["",[],[]],
    typeUser: ["",[],[]],
  });


  constructor(private fb:FormBuilder  ) { }

  ngOnInit(): void {
  }

  save(){
    console.log(this.myForm.value)
  }

}
