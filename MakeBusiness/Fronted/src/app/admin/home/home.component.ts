import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  optionButtons = [
                  {
                    text:"Empresas",
                    path:"companies",
                    icon:"fa fa-solid fa-building ps-2"
                  },
                  {
                    text:"Usuarios",
                    path:"users",
                    icon:"fa fa-solid fa-users"
                  },
                  {
                    text:"Planes",
                    path:"plans",
                    icon:"fa fa-solid fa-money-bill-transfer"
                  },
                  // {
                  //   text:"Plantillas",
                  //   path:"templates",
                  //   icon:"fa fa-solid fa-pen-to-square"
                  // },

                  ]

  constructor() { }

  ngOnInit(): void {
  }

}
