import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  constructor(private http: HttpClient) { }

  //   getPaises() {
  //     return this.http.get(`https://restcountries.eu/rest/v2/lang/es`).pipe(
  //       map((resp: any[]) => {
  //         return resp.map((pais) => {
  //           return {
  //             nombre: pais.name,
  //             codigo: pais.alpha3Code
  //           };
  //         });
  //       })
  //     );
  //   }

  getPaises(): Observable<{}>{
    return this.http.get(`https://restcountries.eu/rest/v2/lang/es`)
      .pipe(
          map( (resp: any[]) =>  resp.map(pais => ({ nombre: pais.name, codigo: pais.alpha3Code })
               )
             )
           );
    }



}
