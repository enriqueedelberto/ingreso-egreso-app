import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import  * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html' 
})
export class LoginComponent implements OnInit, OnDestroy {
   loginForm!: FormGroup;
   loading: boolean = false;
   uiSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui')
                              .subscribe( ui => {
                                 this.loading = ui.isLoading;
                                 console.log('loading subs');
                              });
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }

  loginUser(){
     if(this.loginForm.invalid){
       return;
     }

     this.store.dispatch( ui.isLoading());


    //  Swal.fire({
    //   title: 'Wait, please!', 
    //   timer: 2000,
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading() 
    //   } 
    // });



     const {email, password} = this.loginForm.value;

     this.authService.loginUser(email, password).then( result =>{
       console.log(result);

      //  Swal.close();
      this.store.dispatch( ui.stopLoading());

      
       this.router.navigate(['/']);
     }).catch(err => { 
      this.store.dispatch( ui.stopLoading());
      console.error(err);
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:  err.message 
      })
    
    });      

  }

}
