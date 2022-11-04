import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Plain } from 'src/app/interfaces/plains';
import { PlainService } from 'src/app/services/plain.service';

const ELEMENT_DATA:Plain[] =[
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

@Component({
  selector: 'app-list-plains',
  templateUrl: './list-plains.component.html',
  styleUrls: ['./list-plains.component.scss']
})
export class ListPlainsComponent implements OnInit {
  selectedRowIndex = "";
  selectedPlain:Plain = {} as Plain;

  displayedColumns: string[] = ['id', 'name', 'description', 'price'];
 
  plains:Plain[] = [];
  dataSource = new MatTableDataSource<Plain>();
 

  constructor(private router:Router,private plainService:PlainService) { }

  ngOnInit(): void {
    this.plains = this.plainService.getAllPlains;
    this.dataSource.data = this.plains;
  }

  addPlain(){
    this.router.navigate([`admin/plains/add-plain`])
  }

  editPlain(){
    let id = this.selectedRowIndex;
    this.router.navigate([`admin/plains/${id}/edit-plain`])
  }

  selectRow(row:Plain){
    this.selectedPlain = row;
    this.selectedRowIndex = row.id;
  }

}
