import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Usuario } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  activeUser: Usuario | undefined;
  userSubs: Subscription | undefined;

  constructor(private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(  //Rxjs //Section 9, class 111
      filter( ({user}) =>  user != null)
    ).subscribe(({user}) => {
      this.activeUser = user;
    });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
  }
  logOut() {
      this.authService.logOut().then( () => {
        this.router.navigate(['/login']);
      });
  }

}
