import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/interfaces/company';
import { CompanyService } from 'src/app/services/company.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  company!:Company;

  public favicon!: File | null;
  public logo!: File | null;
  public faviconURL:string | undefined = "";
  public logoURL:string | undefined = "";
  

  buttons = [{"text":'Editar Encabezado', "name":"header"},
              {"text":'Editar Pie de pagina', "name":"footer"},
              {"text":'Editar CSS', "name":"css"},
              {"text":'Editar JS', "name":"js"},
      ]

    myForm:FormGroup = this.fb.group({
    nameCompany   : ["",[Validators.required]],
    description: ["",[Validators.required]],
    category: ["",[Validators.required]],
    location: ["",[]],
    phone: ["",[]],
  });
   

  constructor(private companyService:CompanyService,private fb:FormBuilder,private router:Router) { 


 

  }

  ngOnInit(): void {

       
    this.companyService.getCompanyById(this.companyService.getCurrentIDCompany).subscribe(res =>{
      if(res.ok){
        this.company = res.company;
        this.myForm.setValue({
          nameCompany   :  this.company.nameCompany ?? "",
          description: this.company.description ?? "",
          category: this.company.category ?? "",
          location: this.company.location ?? "",
          phone: this.company.phone ?? ""
        })
      }
    })
  }


 


  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  save(){

    if(this.myForm.valid){
      
      this.companyService.updateCompany(this.companyService.getCurrentIDCompany,this.myForm.value).subscribe(res =>{
        if(res.ok){
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cambios Exitosos',
            showConfirmButton: true,
          }).then(valid =>{
            window.location.reload();
          })
       
        }else{
          Swal.fire({ 
            background:'rgba(250,250,250,0.96)',
            title: 'Oops!! hubo un error',
            text: `${res.msg}`,                  
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });  

       
        }
      })
    }else{
      Swal.fire({ 
        background:'rgba(250,250,250,0.96)',
        title: 'Oops!!',
        text: `Datos incorrectos`,                  
        icon: 'error',
        confirmButtonColor: '#3085d6'
    });  
    }
  }
}
