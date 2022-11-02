import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { User } from 'src/app/interfaces/user';

const Data:User[] = [
                    {
                      "id": "1",
                      "name": "Miran",
                      "email": "mtarge0@goo.gl",
                      "phone": "813-194-2869",
                      "password": "jVEw6xXJn",
                      "type": "admin",
                      "state": 1
                    }, {
                      "id": "2",
                      "name": "Merle",
                      "email": "mpalfrey1@nsw.gov.au",
                      "phone": "150-173-3068",
                      "password": "2zHEGC",
                      "type": "admin",
                      "state": 1
                    }, {
                      "id": "3",
                      "name": "Merla",
                      "email": "mbingall2@bloglines.com",
                      "phone": "724-965-1401",
                      "password": "8Baqsn7",
                      "type": "admin",
                      "state": 1
                    }, {
                      "id": "4",
                      "name": "Belvia",
                      "email": "bprosser3@theguardian.com",
                      "phone": "480-588-0910",
                      "password": "jOYf6Mr",
                      "type": "client",
                      "state": 1
                    }, {
                      "id": "5",
                      "name": "Mufi",
                      "email": "mgerty4@nationalgeographic.com",
                      "phone": "749-743-0849",
                      "password": "wk8TXbSCt",
                      "type": "client",
                      "state": 1
                    }, {
                      "id": "6",
                      "name": "Rodolphe",
                      "email": "rheighway5@wikimedia.org",
                      "phone": "156-709-6763",
                      "password": "01AeXJp4FT",
                      "type": "client",
                      "state": 1
                    }, {
                      "id": "7",
                      "name": "Jonathan",
                      "email": "jmcpartlin6@eepurl.com",
                      "phone": "333-917-2837",
                      "password": "2iblXwxb0",
                      "type": "client",
                      "state": 1
                    }, {
                      "id": "8",
                      "name": "Grove",
                      "email": "ggruszecki7@canalblog.com",
                      "phone": "250-425-7091",
                      "password": "UipWRaX7F7di",
                      "type": "company",
                      "state": 1
                    }, {
                      "id": "9",
                      "name": "Pall",
                      "email": "polney8@hao123.com",
                      "phone": "867-943-9036",
                      "password": "GKN3rqgGaju",
                      "type": "company",
                      "state": 1
                    }, {
                      "id": "10",
                      "name": "Adora",
                      "email": "ametheringham9@about.com",
                      "phone": "448-971-5368",
                      "password": "MJKpog",
                      "type": "company",
                      "state": 10
                    }
]

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {


  users:User[] = Data;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigated(user:User){
    this.router.navigate([`admin/users/${user.id}/edit-user`])

  }
}
