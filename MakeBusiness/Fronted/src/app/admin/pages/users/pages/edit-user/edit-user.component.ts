import { Component, OnInit } from '@angular/core';
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


  constructor(private activatedRoute:ActivatedRoute,private userService:UserService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params:Params) => {
        let data = this.userService.getUser(params['id']);
        if(data != undefined){
          this.user = data; 
          const type = document.getElementById("typeUser") as HTMLSelectElement;
          let index = this.user.type == "client" ? 1 : this.user.type == "company" ? 2 : this.user.type == "admin" ? 3 : 0;
          type.selectedIndex = index ;
        }
      }
    ) 
  }
}
