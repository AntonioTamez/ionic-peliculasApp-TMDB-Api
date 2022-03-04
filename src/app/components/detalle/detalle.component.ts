import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    //console.log('Id', this.id);

    this.moviesService.getPeliculaDetalle( this.id )
    .subscribe( resp => {
      console.log('pelicula' , resp );
      this.pelicula = resp;
    });

    this.moviesService.getActoresPelicula( this.id )
    .subscribe( resp => {
      this.actores = resp.cast;
      console.log('actores', resp );
    });


  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
