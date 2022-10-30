import { Component, OnInit, ViewEncapsulation } from '@angular/core';

interface plain {
  id: number;
  name: string;
}

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BusinessComponent implements OnInit {
  hide = true;
  plains:plain[]=
              [
                {
                  id:1,
                  name:"free"
                },
                {
                  id:2,
                  name:"basic"
                },
                {
                  id:3,
                  name:"premium"
                },
              ]

  constructor() { }

  ngOnInit(): void {
  }

}
