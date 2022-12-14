import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { webCompany } from 'src/app/interfaces/web';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'     


@Component({
  selector: 'app-edit-web',
  templateUrl: './edit-web.component.html',
  styleUrls: ['./edit-web.component.scss']
})
export class EditWebComponent implements OnInit {
  
  web:webCompany = {} as webCompany;

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
    title   : ["",[Validators.required]],
    description: ["",[Validators.required]],
    keywords: ["",[Validators.required]],
  });
   


  constructor(private companyService:CompanyService,private fb:FormBuilder,private router:Router) { 

    this.companyService.getWeb(this.companyService.getCurrentIDCompany).subscribe( res=>{
      if(res.ok){
    
        this.web = res.web;
        this.faviconURL = `${environment.baseUrl}/uploads/web/${this.web.favicon}`
        this.logoURL = `${environment.baseUrl}/uploads/web/${this.web.logo}`
        this.myForm.setValue({
          title   :  this.web.title,
          description: this.web.description ?? "",
          keywords: this.web.keywords ?? "",
        })
      }
    });

  }

  ngOnInit(): void {
   
    

 
  }

 

  changeFavicon(event:any){
    const allow = ['image/png', 'image/jpeg', 'image/jpg']
    this.favicon = event?.target?.files[0];
    if (!this.favicon)  
      return; 
    
    if(!allow.includes(this.favicon.type)) {
      Swal.fire({ 
        background:'rgba(250,250,250,0.96)',
        title: 'Oops!! hubo un error',
        text: `Tipo de archivo no valido`,                  
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
       return;
    }
    const reader = new FileReader();
 
    reader.readAsDataURL(this.favicon);  
    reader.onload = (event) => {   
      this.faviconURL = event.target?.result?.toString();
    }
  }

  changeLogo(event:any){
    const allow = ['image/png', 'image/jpeg', 'image/jpg']
    this.logo = event?.target?.files[0];
    if (!this.logo) 
      return; 
  
    if(!allow.includes(this.logo.type)) {
      Swal.fire({ 
        background:'rgba(250,250,250,0.96)',
        title: 'Oops!! hubo un error',
        text: `Tipo de archivo no valido`,                  
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
       return;
    }
    const reader = new FileReader();
 
    reader.readAsDataURL(this.logo);  
    reader.onload = (event) => {   
      this.logoURL = event.target?.result?.toString();
    }
  }


  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  save(){

    if(this.myForm.valid){
      
      const {title,description,keywords} = this.myForm.value
      let logo = this.logo;
      let favicon = this.favicon;

      let web = {
        title,
        description,
        keywords,
        logo,
        favicon,
      }

      
   
      this.companyService.updateWeb(this.companyService.getCurrentIDCompany,web).subscribe(res =>{
        
        if(res.ok){
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cambios Exitosos, redireccionando a Home',
            showConfirmButton: true,
          }).then(()=>{
            this.router.navigateByUrl(`admin-companies/${localStorage.getItem("_web")}`) 
          })
         
        }else{  
          Swal.fire({ 
            background:'rgba(250,250,250,0.96)',
            title: 'Oops!! hubo un error',
            text: `${res.msg}`,                  
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });
          console.log(res.error)
        }
      })
    }else{
      console.log(this.myForm.valid)
      console.log(this.myForm.value)
      Swal.fire({ 
        background:'rgba(250,250,250,0.96)',
        title: 'Oops!! hubo un error',
        text: `Datos mal ingresados`,                  
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    }
  }
}
