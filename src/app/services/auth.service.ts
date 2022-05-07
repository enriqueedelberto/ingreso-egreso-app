import { Injectable } from '@angular/core';
import { User, Usuario } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import  * as authActions from '../auth/auth.actions';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription | undefined;

  constructor(public auth: AngularFireAuth,
              private store: Store<AppState>,
              private firestore: AngularFirestore  ) { }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
       console.log(fuser)
      if(fuser){

       this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
           .subscribe( (firestoreUser: any) => {
             console.log(firestoreUser);
             
             const user =   Usuario.fromFireBase(firestoreUser );

             this.store.dispatch( authActions.setUser ( {user} ));
           });
       
      }else{ 
        this.userSubscription?.unsubscribe();
        this.store.dispatch( authActions.unSetUser());
      }

     

    });
  }


  createUser( usuario: User){ 
    
    return this.auth.createUserWithEmailAndPassword(usuario.correo, usuario.password)
             .then( ({ user } )=> {

               const newUser = new Usuario(  usuario.nombre, user?.email, user?.uid,   );
               
               return this.firestore.doc(`${newUser.uid}/usuario`)//Section 7, class 81 
                 .set ({...newUser});

             });
  }


  loginUser( email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }


  logOut (){
    return this.auth.signOut();
  }

  isAuth(){ //Section 7, class 80 
    return this.auth.authState.pipe( 
       map( fbUser => fbUser != null)
    );
  }
}
