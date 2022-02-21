import { Injectable } from '@angular/core';
import { User, Usuario } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore  ) { }

  initAuthListener() {
    this.auth.authState.subscribe( firebaseUser => {
      console.log(firebaseUser)
    });
  }


  createUser( usuario: User){ 
    
    return this.auth.createUserWithEmailAndPassword(usuario.correo, usuario.password)
             .then( ({ user } )=> {

               const newUser = new Usuario(  usuario.nombre, user?.email, user?.uid,   );
               
               return this.firestore.doc(`${newUser.uid}/usuario`)
                 .set ({...newUser});

             });
  }


  loginUser( email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }


  logOut (){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe( 
       map( fbUser => fbUser != null)
    );
  }
}
