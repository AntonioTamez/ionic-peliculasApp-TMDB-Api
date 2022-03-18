import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();


  slideOpts = {
    slidesPerView: 3.3, 
    freeMode: true,
    spaceBetween: -10,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 3.5,
        spaceBetween: 10
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 5.5,
        spaceBetween: 20
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 7.5,
        spaceBetween: 30
      }
    }
  };

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {}

  onClick(){
    this.cargarMas.emit();
  }

  async verDetalle(id: string){

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id: id
      }
    });

    modal.present();

  }
  
}
