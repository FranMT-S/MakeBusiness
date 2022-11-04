import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Plain } from 'src/app/interfaces/plains';
import { PlainService } from 'src/app/services/plain.service';

@Component({
  selector: 'app-edit-plain',
  templateUrl: './edit-plain.component.html',
  styleUrls: ['./edit-plain.component.scss']
})
export class EditPlainComponent implements OnInit {

  // Vars
  plain:Plain = {} as Plain;


  constructor(private activatedRoute:ActivatedRoute,private plainService:PlainService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params:Params) => {
        let data = this.plainService.getPlain(params['id']);
        if(data != undefined){
          this.plain = data; 
        }
      }
    ) 
  }

}
