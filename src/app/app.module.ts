import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MisSurfaceComponent } from './components/mis-surface/mis-surface.component';
import {JsonLoaderService} from './services/json-loader.service';
import {TemplateCreatorService} from './services/template-creator.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    MisSurfaceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [JsonLoaderService,TemplateCreatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
