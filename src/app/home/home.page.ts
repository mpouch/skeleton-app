import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombre: string = "Juan";

  niveles:any[]=[
    {id:1,nivel:"Básica Incompleta"},
    {id:2,nivel:"Básica Completa"},
    {id:3,nivel:"Media Incompleta"},
    {id:4,nivel:"Media Completa"},
    {id:5,nivel:"Media Incompleta"},
    {id:6,nivel:"Superior Completa"}
  ]

  data:any={
    nombre:"",
    apellido:"",
    educacion:"",
    nacimiento:""
  };


  constructor() {}

}
