import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  TextoBuscar = '';
  ideas: string[] = ['Spiderman','Avengers','Batman'];
  peliculas : Pelicula[] = [];

  constructor(private movieService : MoviesService) {}

  buscar(event) {
    
    const valor = event.detail.value;
 

    this.movieService.buscarPeliculas( valor )
    .subscribe( resp => {
      console.log(resp);
      this.peliculas = resp.results;
    });

  }

 

}
