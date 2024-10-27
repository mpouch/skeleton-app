import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
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

  data: any = {
    nombre:"",
    apellido:"",
    educacion:"",
    nacimiento:""
  };


  // Se reciben los datos desde la página login
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    })
  }

  openDialog() {
    const dialogoActual = this.dialog.open(DialogComponent, {
      data: {
        nombre: this.data.nombre,
        apellido: this.data.apellido,
        educacion: this.niveles.find(niv => niv.id === this.data.educacion)?.nivel || 'N/A',
        nacimiento: this.data.nacimiento
      }
    })
  }

}
