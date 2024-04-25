import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServerModule } from '@angular/platform-server';
//import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule, FormsModule, ReactiveFormsModule],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
