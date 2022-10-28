import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PlainsComponent } from './components/plains/plains.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MaterialModule } from '../material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    NavBarComponent,
    LandingComponent,
    HomeComponent,
    PresentationComponent,
    FooterComponent,
    ServicesComponent,
    ContactUsComponent,
    PlainsComponent,
    AboutUsComponent,
    
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    MaterialModule,
    FontAwesomeModule
  ],
  exports:[
    LandingComponent,
    NavBarComponent
    
  ]
})
export class LandingPageModule { }
