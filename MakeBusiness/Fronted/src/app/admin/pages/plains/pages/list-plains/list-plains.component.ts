import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Plain } from 'src/app/interfaces/plains';
import { PlainService } from 'src/app/services/plain.service';


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
