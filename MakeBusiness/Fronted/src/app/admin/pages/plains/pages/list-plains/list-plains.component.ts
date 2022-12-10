import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Plan } from 'src/app/interfaces/plains';
import { PlanService } from 'src/app/services/plain.service';
import Swal from 'sweetalert2'     


@Component({
  selector: 'app-list-plains',
  templateUrl: './list-plains.component.html',
  styleUrls: ['./list-plains.component.scss']
})
export class ListPlainsComponent implements OnInit {
  selectedRowIndex = "";
  selectedPlain:Plan = {} as Plan;

  displayedColumns: string[] = ['_id', 'name', 'description','limitPages','limitProducts','limitFiles','annuity','price'];
 
  plans:Plan[] = [];
  dataSource = new MatTableDataSource<Plan>();
 

  constructor(private router:Router,private planService:PlanService) { }

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans(){
    this.planService.getAllPlans.subscribe( res =>{
      if(res.ok){
        this.plans = res.plans;
        this.dataSource.data = this.plans;

      }
    });
  }

  addPlan(){
    this.router.navigate([`admin/plans/add-plan`])
  }

  editPlan(){
    let id = this.selectedRowIndex;
    this.router.navigate([`admin/plans/${id}/edit-plan`])
  }



  deletePlan(){
      
      Swal.fire({
        text: "¿Desea eliminar este plan?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          this.planService.deletePlan(this.selectedPlain._id).subscribe( res =>{
            if(res.ok){
              this.getPlans();
            }else{
              
          Swal.fire({ 
            background:'rgba(250,250,250,0.96)',
            title: 'Oops!! No se pudo eliminar',
            text: `${res.msg}`,                  
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });

              console.log(res.error)
            }
          });
        }
      })


  
  }

  selectRow(row:Plan){
    this.selectedPlain = row;
    this.selectedRowIndex = row._id;
  }

}
