import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  favIcon: HTMLLinkElement | null = document.querySelector('#favIcon'); 

  constructor(private authService:AuthService) { 
    this.favIcon!.href = `favicon.ico`
    this.authService.validarToken().subscribe( res => res); 
  }

  ngOnInit(): void {
  }


}
