import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  scrollingSmooth(seccionId:string){
    const coordenadaTopSeccion = document.getElementById(seccionId)?.getBoundingClientRect().top
    scrollTo(0, coordenadaTopSeccion!-10);
  }
}
