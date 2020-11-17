import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


// Interface
interface ErrorValidate{
  // regresa cualqueir cantidad de llaves y valor de estas van a ser booleanas
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

    existeUsuario(control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate> {

      // Evitar que se llame la petición al recargar
      if ( !control.value ){
        // retorno una promesa resuelta
        return Promise.resolve(null);
      }

      return new Promise((resolve, reject) => {
              setTimeout(() => {
                // petición asincrona
                if (control.value === 'strider') {
                  resolve({ existe: true });
                }else{
                  resolve( null );
                }
              }, 3500);
      });
    }

  // Crearemos una colección de validadores 
  // validación que evita que se coloque este apellido
  noAraya(control: FormControl): ErrorValidate {

    if ( control.value?.toLowerCase() === 'araya'){
      return {
        noAraya: true
      };
    }

    return null;
  }


  passwordsIguales( pass1Name: string, pass2Name: string ) {
    // recibo un formulario
    return ( formGroup: FormGroup) => {
        const pass1Control = formGroup.controls[pass1Name];
        const pass2Control = formGroup.controls[pass2Name];

        if ( pass1Control.value === pass2Control.value ) {
            // tengo que pasar la validación
            pass2Control.setErrors(null);
        }else{
           pass2Control.setErrors({ noEsIgual: true });
        }
    }

  }

}


