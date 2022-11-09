import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  public page:number | undefined;

  companies = [
    {
      'id':1,
      'nameCompany':'apple',
      'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QpFZugy5noYtXwlio3uynoFJ64oMexU8JERO9h3o0-WqWktQe9vmw66yMCVTlhbATrA&usqp=CAU',
      'description':'lorensdifneojgyfyfuiufyiufuasds',
      'category':'tecnology'
    },
    {
      'id':2,
      'nameCompany':'amazon',
      'image':'data:image/jpeg;base64,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',
      'description':'edwsrwerwerwojp',
      'category':'tecnology'
    },
    {
      'id':3,
      'nameCompany':'Avon',
      'image':'https://imagenes.elpais.com/resizer/53RQVs-qnS0eKCYlBVvkSSUeYqg=/414x0/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/NLSJHK7GLVRZ3JOPEFBNUMU5HU.jpg',
      'description':'qrwwerwtyrtutrfcyhrtruyyuf6trftfgur',
      'category':'cosmetic'
    },
    {
      'id':4,
      'nameCompany':'Bimbo',
      'image':'https://img.lalr.co/cms/2019/01/11175242/Bimbo.jpg',
      'description':'qrwwerwtyrtutrfcyhrtruyyuf6trftfgur',
      'category':'food'
    }, {
      'id':1,
      'nameCompany':'apple',
      'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QpFZugy5noYtXwlio3uynoFJ64oMexU8JERO9h3o0-WqWktQe9vmw66yMCVTlhbATrA&usqp=CAU',
      'description':'lorensdifneojgyfyfuiufyiufuasds',
      'category':'tecnology'
    }, {
      'id':1,
      'nameCompany':'apple',
      'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QpFZugy5noYtXwlio3uynoFJ64oMexU8JERO9h3o0-WqWktQe9vmw66yMCVTlhbATrA&usqp=CAU',
      'description':'lorensdifneojgyfyfuiufyiufuasds',
      'category':'tecnology'
    }, {
      'id':1,
      'nameCompany':'apple',
      'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QpFZugy5noYtXwlio3uynoFJ64oMexU8JERO9h3o0-WqWktQe9vmw66yMCVTlhbATrA&usqp=CAU',
      'description':'lorensdifneojgyfyfuiufyiufuasds',
      'category':'tecnology'
    },
    {
      'id':1,
      'nameCompany':'apple',
      'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QpFZugy5noYtXwlio3uynoFJ64oMexU8JERO9h3o0-WqWktQe9vmw66yMCVTlhbATrA&usqp=CAU',
      'description':'lorensdifneojgyfyfuiufyiufuasds',
      'category':'tecnology'
    },{
      'id':1,
      'nameCompany':'apple',
      'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QpFZugy5noYtXwlio3uynoFJ64oMexU8JERO9h3o0-WqWktQe9vmw66yMCVTlhbATrA&usqp=CAU',
      'description':'lorensdifneojgyfyfuiufyiufuasds',
      'category':'tecnology'
    },{
      'id':1,
      'nameCompany':'apple',
      'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QpFZugy5noYtXwlio3uynoFJ64oMexU8JERO9h3o0-WqWktQe9vmw66yMCVTlhbATrA&usqp=CAU',
      'description':'lorensdifneojgyfyfuiufyiufuasds',
      'category':'tecnology'
    },{
      'id':1,
      'nameCompany':'apple',
      'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QpFZugy5noYtXwlio3uynoFJ64oMexU8JERO9h3o0-WqWktQe9vmw66yMCVTlhbATrA&usqp=CAU',
      'description':'lorensdifneojgyfyfuiufyiufuasds',
      'category':'tecnology'
    },{
      'id':1,
      'nameCompany':'apple',
      'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QpFZugy5noYtXwlio3uynoFJ64oMexU8JERO9h3o0-WqWktQe9vmw66yMCVTlhbATrA&usqp=CAU',
      'description':'lorensdifneojgyfyfuiufyiufuasds',
      'category':'tecnology'
    },{
      'id':1,
      'nameCompany':'apple',
      'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QpFZugy5noYtXwlio3uynoFJ64oMexU8JERO9h3o0-WqWktQe9vmw66yMCVTlhbATrA&usqp=CAU',
      'description':'lorensdifneojgyfyfuiufyiufuasds',
      'category':'tecnology'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
