import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string | undefined;

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


  // Se reciben los datos desde la página login
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    })
  }

}
