import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  
  myForm:FormGroup = this.fb.group({
    name   : ["",[],[]],
    description: ["",[],[]],
    price: ["",[],[]],
    limitPage: ["",[],[]],
    limitProducts: ["",[],[]],
    limitFiles: ["",[],[]],
  });

  constructor(private activatedRoute:ActivatedRoute,private plainService:PlainService, private fb:FormBuilder) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params:Params) => {
        let data = this.plainService.getPlain(params['id']);
        if(data != undefined){
          this.plain = data; 
          this.myForm.setValue({
            name   : this.plain.name,
            description: this.plain.description,
            price: this.plain.price,
            limitPage: this.plain.limitPage,
            limitProducts: this.plain.limitProducts,
            limitFiles: this.plain.limitFiles,
          }

          )
        }
      }) 
  }

  save(){
    console.log(this.myForm.value)
  }
}
