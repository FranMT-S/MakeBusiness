import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductHistory } from 'src/app/interfaces/product';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history-purchases',
  templateUrl: './history-purchases.component.html',
  styleUrls: ['./history-purchases.component.scss']
})
export class HistoryPurchasesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity','total','date'];
  selectedRowIndex = "";
  productHistory:ProductHistory[] = [];
  dataSource = new MatTableDataSource<ProductHistory>();
 
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    // let client = this.userService.getClient('1');
    // console.log(this.displayedColumns.slice(0,-1))
    // if(client.history != null){
    //   this.productHistory = client.history;
    // };
   
    // this.dataSource.data = this.productHistory
    
  }

}
