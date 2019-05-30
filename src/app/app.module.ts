/*
 * @Author: zhao.changlei
 * @Date: 2019-03-21 09:35:45
 * @Last Modified by: zhao.changlei
 * @Last Modified time: 2019-03-21 09:40:22
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
