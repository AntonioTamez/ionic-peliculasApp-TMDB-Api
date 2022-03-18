import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 3.3, 
    freeMode: true,  
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
