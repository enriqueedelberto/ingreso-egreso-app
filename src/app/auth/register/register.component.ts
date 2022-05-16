import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import  * as uiActions from '../../shared/ui.actions';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription | undefined;//Section 8, class 89

  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private store: Store<AppState>,//Section 8, class 89
              private router: Router) { }

  ngOnInit(): void {
     this.registerForm = this.fb.group({
        nombre: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
     });

     this.uiSubscription = this.store.select('ui')
                              .subscribe( ui => this.loading = ui.isLoading );
  }

  
  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();//Section 8, class 89
  }

  createUser(){
       if( this.registerForm.invalid){
         return;
       }

       const {nombre, correo, password} = this.registerForm.value; 
       
       this.store.dispatch( uiActions.isLoading());//Section 8, class 89
    //  Swal.fire({
    //   title: 'Wait, please!', 
    //   timer: 2000,
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading() 
    //   } 
    // });
 
       this.authService.createUser( {nombre, correo, password})
        .then(credentials => {
          console.log(credentials);
          
          this.store.dispatch( uiActions.stopLoading());//Section 8, class 89
          // Swal.close();

          this.router.navigate(['/']);
        }).catch(err => {  
          this.store.dispatch( uiActions.stopLoading());

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:  err.message 
          })
        
        });  
  }
}
