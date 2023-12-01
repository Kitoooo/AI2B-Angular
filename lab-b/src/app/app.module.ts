import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RandomComponent } from './random/random.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    RandomComponent,
    ListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
