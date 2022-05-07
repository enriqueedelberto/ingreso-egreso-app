export interface User {//Section 7, class 81 
    nombre: string,
    correo: string,
    password: string
}

export class Usuario {

  static fromFireBase( { email, uid, nombre}: Usuario ){
    return new Usuario( nombre, email, uid);
  }

    constructor(
      public nombre: string,
      public email?: string | null,
      public uid?: string,
       
    ){

    }
}