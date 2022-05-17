import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
 
@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas : Pelicula[] = [];

  slideOpts = {
    slidesPerView: 1.3,
    freeMode: true, 
    spaceBetween: 0,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2.3,
        spaceBetween: 10
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3.3,
        spaceBetween: 20
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4.3,
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
