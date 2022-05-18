import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

//Angular Fire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { StoreModule } from '@ngrx/store';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';


import { appReducers } from './app.reducer'; 
import { AuthModule } from './auth/auth.module'; 




@NgModule({
  declarations: [
    AppComponent, 
    
  ],
  imports: [
    BrowserModule,
    AuthModule,  //Section 9, lecture 116 
    
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot( appReducers ),//Section 8 class 87: Creation reducers and actions with snippets
    StoreDevtoolsModule.instrument({
      maxAge: 25,//Section 8 class 87: Creation reducers and actions with snippets
      logOnly: environment.production
    }),
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
