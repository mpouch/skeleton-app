import { Component, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  @ViewChildren(IonInput, {read: ElementRef}) inputs: QueryList<ElementRef<HTMLIonInputElement>> | undefined;

  username: string | undefined;
  private animation: Animation | undefined;

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
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private animationCtrl: AnimationController) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    })
  }

  playAnimation() {
    if (this.inputs) {
      this.inputs.forEach(input => {
        const animation = this.animationCtrl
        .create()
        .addElement(input.nativeElement)
        .duration(1000)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
        .fromTo('opacity', '1', '0.2');
        animation.onFinish(() => animation.stop());
        animation.play();
      })
    }
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

  cleanForm() {
    this.data = {
      nombre: '',
      apellido: '',
      educacion: '',
      nacimiento: ''
    }
  }

  // async playAnimation() {
  //   await this.animation?.play();
  //   this.animation?.stop();
  // }
}
