import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  TextoBuscar = '';
  ideas: string[] = ['Spiderman','Avengers','Batman'];
  peliculas : Pelicula[] = [];
  buscando = false;

  constructor(private movieService : MoviesService, private modalCtrl : ModalController) {}

  buscar(event) {
    
    const valor: string = event.detail.value;

    if (valor.length   === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;

    this.movieService.buscarPeliculas( valor )
    .subscribe( resp => {
      console.log(resp);
      this.peliculas = resp.results;
      this.buscando = false;
    });
  }

  async verDetalle(id: string) {

    const modal = await this.modalCtrl.create ({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

 
  }
 

}
