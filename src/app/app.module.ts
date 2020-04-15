import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SceneComponent} from './components/scene/scene.component';
import {VectorHandler} from './services/vector-handler';

@NgModule({
  declarations: [
    AppComponent,
    SceneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [VectorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
