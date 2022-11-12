import { Component, OnInit } from '@angular/core';
import { Plain } from 'src/app/interfaces/plains';

@Component({
  selector: 'app-plains',
  templateUrl: './plains.component.html',
  styleUrls: ['./plains.component.scss']
})
export class PlainsComponent implements OnInit {


  plains:Plain[] = [
                      {
                        id:"1",
                        name: "Free",
                        description: "Licencia de prueba de productos por 1 semana",
                        price: 0,
                        annuity:"Free",
                        limitPage: 5,
                        limitProducts: 10,
                        limitFiles: 10,
                      },
                      {
                        id:"2",
                        name: "Basico",
                        description: "Licencia  con basica con lo que podras tener los recursos basicos para crear una pagina web",
                        price: 30,
                        annuity:"Mensual",
                        limitPage: 15,
                        limitProducts: 20,
                        limitFiles: 20,
                      },
                      {
                        id:"3",
                        name: "Premium",
                        description: "Licencia de sin limites, aprovecha nuestro servicio sin restricciones",
                        price: 330,
                        annuity:"anual",
                        limitPage: 0,
                        limitProducts: 0,
                        limitFiles: 0,
                      }
                    ];

  constructor() { }

  ngOnInit(): void {
  }

  getPlains():Plain[]{

    return this.plains;
  }

}
