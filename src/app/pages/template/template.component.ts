import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {



  // propiedad necesaria para utilizar data en el select en el html
  paises: any[] = [];

  // Estableceremos un valor al formulario
  usuario = {
    nombre: 'Pedro',
    apellido: 'Araya',
    correo: 'pieteraraya@gmail.com',
    pais: 'CHL',
    genero: 'M'
  };
  constructor(
              // Para usar el servicio
              private paisService: PaisService
              ) {}

  ngOnInit(): void {
    // Haremos la peticción http
    this.paisService.getPaises()
        .subscribe( (paises: any) => {

          this.paises = paises;

          // valor por defecto en la primera posición del arreglo

          this.paises.unshift({
            nombre: 'Seleccione  país',
            codigo: ''
          });


          console.log(this.paises);
      }); // regresa un observable
  }


  guardar(forma: NgForm): void{
    // console.log('submit disparado');
    // console.log(forma);

    if (forma.invalid) {
      return Object.values( forma.controls).forEach( control =>{
        console.log(control);
        control.markAsTouched();
        Swal.fire({
          icon: 'error',
          title: 'Validaciones',
          text: 'Debe llenar todos los campos',
        });
      });
    }


    Swal.fire({
      icon: 'success',
      title: 'Su información ha sido enviada ',
      showConfirmButton: false,
      timer: 1500
    });

    console.log(forma.value);
  }

}
