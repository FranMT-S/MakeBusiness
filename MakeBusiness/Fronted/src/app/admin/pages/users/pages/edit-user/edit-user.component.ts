import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute,Params } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
// import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  // Vars
  user:User = {} as User;

  myForm:FormGroup = this.fb.group({
    name   : ["",[],[]],
    password: ["",[],[]],
    mail: ["",[],[]],
    typeUser: ["",[],[]],
  });

  constructor(private activatedRoute:ActivatedRoute,private userService:UserService,
              private fb:FormBuilder) { 
  }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( (params:Params) => {
        let data = this.userService.getUser(params['id']);
        if(data != undefined){
            this.user = data; 
            let index = this.user.type == "client" ? 1 : this.user.type == "company" ? 2 : this.user.type == "admin" ? 3 : 0;
            
            this.myForm.setValue({
              name: this.user.name,
              password: this.user.password,
              mail: this.user.email,
              typeUser: index,
            })
          
        
        }
      }) 
  }

  save(){
    console.log(this.myForm.value)
  }
}
