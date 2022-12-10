import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Page404Component } from './shared/page404/page404.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HtmlEditorComponent } from './components/html-editor/html-editor.component';
import { JsEditorComponent } from './components/js-editor/js-editor.component';
import { CssEditorComponent } from './components/css-editor/css-editor.component';
import { MultiEditorComponent } from './components/multi-editor/multi-editor.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    Page404Component,

    HtmlEditorComponent,
    JsEditorComponent,
    CssEditorComponent,
    MultiEditorComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LandingPageModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    

  ],
 
  providers: [
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
