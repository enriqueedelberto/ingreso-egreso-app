import { Injectable } from '@angular/core';
import {   CanActivate, CanLoad, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

//Section 7, class 80
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, 
              private router: Router){

  }

  canLoad(): Observable<boolean> { //Section 10, lecture 121 Can load
    return this.authService.isAuth()
        .pipe( 
          tap( estado => { 
            if( !estado ){ return this.router.navigate(['/login']) }
            return false;
          }),
          take(1)
        );
        
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth()
        .pipe( 
          tap( estado => { //For secundary effect
            if( !estado ){ return this.router.navigate(['/login']) }
            return false;
          })
        );
        
  }
  
}
