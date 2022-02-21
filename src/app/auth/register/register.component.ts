import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
     this.registerForm = this.fb.group({
        nombre: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
     });
  }

  createUser(){
       if( this.registerForm.invalid){
         return;
       }

       const {nombre, correo, password} = this.registerForm.value; 
       
     Swal.fire({
      title: 'Wait, please!', 
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading() 
      } 
    });
 
       this.authService.createUser( {nombre, correo, password})
        .then(credentials => {
          console.log(credentials); 
          Swal.close();

          this.router.navigate(['/']);
        }).catch(err => { 
       
          console.error(err);
          
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:  err.message 
          })
        
        });  
  }
}
