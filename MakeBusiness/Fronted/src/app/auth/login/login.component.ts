import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  hide = true;
  myForm:FormGroup = this.fb.group({
    email   : [,[],[]],
    password: [,[],[]]
  });

  constructor(private router:Router, private fb:FormBuilder) { }
  ngOnInit(): void {
  }

  login(){
     console.log("hola")
     this.router.navigateByUrl("/client");
  }

}
