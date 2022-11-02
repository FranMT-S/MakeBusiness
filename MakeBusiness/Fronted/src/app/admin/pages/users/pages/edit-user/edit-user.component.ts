import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  id:string = ""
  constructor(private activatedRoute:ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params:Params) => this.id = params['id']
    )
  }

}
