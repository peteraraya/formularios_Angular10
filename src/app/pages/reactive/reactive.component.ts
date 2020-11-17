import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ValidadoresService } from '../../services/validadores.service';
@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;
  constructor(
              private fb: FormBuilder,
              private validadores: ValidadoresService
            ) {

      this.crearFormulario();

      this.cargarDataAlFormulario();

      this.crearListeners();
   }



  ngOnInit(): void {
  }

  // Getter para marcar input con las validaciones

  // Referencia para el formArray
  get pasatiempos(): FormArray{
    return this.forma.get('pasatiempos') as FormArray;
  }
  // Nombre
  get nombreNoValido(): boolean{
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  // Apellido
  get apellidoNoValido(): boolean{
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  // Correo
  get correoNoValido(): boolean{
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  // Usuario
  get usuarioNoValido(): boolean {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }
  // Dirección - Región
  get regionNoValido(): boolean{
    return this.forma.get('direccion.region').invalid && this.forma.get('direccion.region').touched;
  }
  // Dirección Ciudad
  get ciudadNoValido(): boolean{
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  // Validaciones de contraseñas
  get pass1NoValido(): boolean {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }
  get pass2NoValido(): boolean {
    // referencia al pass1
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;
  }


  crearFormulario(): void{
    this.forma = this.fb.group({
        // definimos nuestro formulario
        nombre  : ['', [ Validators.required, Validators.minLength(5)  ] ],
      apellido  : ['', [ Validators.required, this.validadores.noAraya ] ],



      correo    : ['', [ Validators.required,
                         Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,3}$')]
                  ],
      usuario   : ['', , this.validadores.existeUsuario],
      pass1     : ['', Validators.required],
      pass2     : ['', Validators.required],
      direccion : this.fb.group({
                region  : ['', Validators.required],
                ciudad  : ['', Validators.required],
      }),
      // arreglo de controles
      pasatiempos: this.fb.array([])
    },{
      // Validaciones a nivel formularios , validaciones asyncronos y normales(sincronos)
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }


  crearListeners(){
    // me avisa de cualquier cambio de esta forma
    this.forma.valueChanges.subscribe( valor =>{
      console.log(valor);
    });
    // Estus
    this.forma.statusChanges.subscribe( status => {
      console.log({status});
    });

    // cambios personalizados
    this.forma.get('nombre').valueChanges.subscribe( console.log );
  }

  // metodo cargar formulario
  cargarDataAlFormulario(): void{
    // hacemos refeencia setValue --> debo establecer toda la estructura
    this.forma.reset({
      nombre    : 'Peter',
      apellido  : 'Araya2',
      correo    : 'piteraraya@gmail.com',
      pass1     : '123',
      pass2     : '123',
      direccion : {
        region  : 'v region',
        ciudad  : 'Quillota'
      },

    });
  }

  // Agregar Pasatiempo
  agregarPasatiempo(): void{
    this.pasatiempos.push( this.fb.control(''));
  }

  // Borrar Pasatiempo
  borrarPasatiempo( i: number): void{
    this.pasatiempos.removeAt(i);
  }


  // Metodo de guardar para manejar el posteo
  guardar(): void{
    console.log(this.forma);

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        console.log(control);

      // en caso de utilizar formGroup
        if (control instanceof FormGroup ) {
        Object.values(control.controls).forEach( control => control.markAsTouched() );
      }else{
          control.markAsTouched();
      }

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


    // Posteo de información --> haremos el reset del formulario
    this.forma.reset({
      nombre: 'Escriba un nombre',
    });
  }




}
