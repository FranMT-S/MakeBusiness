import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductHistory } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history-purchases',
  templateUrl: './history-purchases.component.html',
  styleUrls: ['./history-purchases.component.scss']
})
export class HistoryPurchasesComponent implements OnInit {
  displayedColumns: string[] = ['idProduct', 'name', 'price', 'quantity','total','date'];
  selectedRowIndex = "";
  productHistory:ProductHistory[] = [];
  dataSource = new MatTableDataSource<ProductHistory>();
 
  constructor(private clientService:ClientService,private authService:AuthService) {
     this.clientService.getClient(this.authService.user._id).subscribe(res =>{
        if(res.ok){

          this.productHistory = res.client.historical!;
          this.dataSource.data = this.productHistory
        }
     })

   }

  ngOnInit(): void {
    // let client = this.userService.getClient('1');
    // console.log(this.displayedColumns.slice(0,-1))
    // if(client.history != null){
    //   this.productHistory = client.history;
    // };
   
    // this.dataSource.data = this.productHistory
    
  }

}
