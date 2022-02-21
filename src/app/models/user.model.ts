export interface User {
    nombre: string,
    correo: string,
    password: string
}

export class Usuario {
    constructor(
      public nombre: string,
      public email?: string,
      public uid?: string,
      

    ){

    }
}