import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CompanyService } from 'src/app/services/company.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'     


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

   // Vars
   product:Product = {} as Product;
   public uploadImage!: File | null;
   public imageUrl:string | undefined = `${environment.baseUrl}/uploads/other/img-default.png`;
   private idProduct:string = ""
 

   myForm:FormGroup = this.fb.group({
    name   : ["",[Validators.required]],
    description: ["",[Validators.required]],
    price: ["",[Validators.required,this.validatorService.isNumber]],
    categories: ["",[Validators.required]],
 
  });

   constructor(private activatedRoute:ActivatedRoute,private companyService:CompanyService,private router:Router,
              private fb:FormBuilder,private validatorService:ValidatorService) { 



    this.activatedRoute.params.subscribe( (params:Params) => {
      this.idProduct = params['id'];
      this.companyService.getProductById(this.idProduct).subscribe(res => {
        if(res.ok){

          this.product = res.product
          this.imageUrl = `${environment.baseUrl}/uploads/products/${res.product.image}`
      
   

          this.myForm.setValue({
            name: this.product.name,
            description: this.product.description,
            price: this.product.price,
            categories: this.product.categories,          
          })


        }
     
      })


    })
    
   }
 

  ngOnInit(): void {
  }


  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  changeImage(event:any){
    const allow = ['image/png', 'image/jpeg', 'image/jpg']
    this.uploadImage = event?.target?.files[0];
    if (!this.uploadImage) {  
      this.myForm.get("image")?.markAsPristine(); 
      return; 
    }
    if(!allow.includes(this.uploadImage.type)) {
      this.myForm.get("image")?.markAsPristine();
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
    reader.readAsDataURL(this.uploadImage);  
    reader.onload = (event) => {   
      this.imageUrl = event.target?.result?.toString();
    }
  }

  save(){


    if(this.myForm.valid){
      
      const {name,description,price,categories} = this.myForm.value
      let image = this.uploadImage;

      let product = {
        name,
        description,
        price,
        categories,
        image,
      }

      this.companyService.updateProduct(this.idProduct,product).subscribe(res =>{
       
        if(res.ok){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cambios Exitosos',
            showConfirmButton: true,
          }).then( ()=>{
            this.router.navigateByUrl(`admin-companies/${localStorage.getItem("_web")}/products/list`)

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
        text: `Ingrese los datos correctos`,                  
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    }
  }
}
