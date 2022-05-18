import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

 //Section 9, lecture 116

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ] 
})
export class AuthModule { }
