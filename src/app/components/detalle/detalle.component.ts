import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle } from '../../interfaces/interfaces';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    //console.log('Id', this.id);

    this.moviesService.getPeliculaDetalle( this.id )
    .subscribe( resp => {
      console.log( resp );
      this.pelicula = resp;
    });

    this.moviesService.getActoresPelicula( this.id )
    .subscribe( resp => {
      console.log( resp );
    });

  }

}
