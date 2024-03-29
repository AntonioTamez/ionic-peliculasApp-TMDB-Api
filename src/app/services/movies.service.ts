import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeliculaDetalle, RespuestaCredits, RespuestaMDB, Genre } from '../interfaces/interfaces';
import { promise } from 'protractor';
 

const URL = environment.url;
const apikey = environment.apikey; 


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  private generos: Genre[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string){
    query = URL + query;
    query += `&api_key=${ apikey }&language=es&include_image_language=es`;

    //(query);
    return this.http.get<T>( query );
  }

  getFeature(){

    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth()+1;

    let mesString;

    if( mes < 10 ){
      mesString = '0'+mes;
    } else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`
    const fin    = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`

    //return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-01-01&primary_release_date.lte=2022-02-01&api_key=feb24f7bf104963a87d169004a10db25&language=es&include_image_language=es`);
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  getpopulares(){

    this.popularesPage ++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`

    return this.ejecutarQuery<RespuestaMDB>(query);

  }

  getPeliculaDetalle(id: string){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`)
  }

  getActoresPelicula(id: string){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`)
  }

  buscarPeliculas( texto: string ){
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${ texto }`);
  }

  cargarGeneros(): Promise<Genre[]>{

    return new Promise( resolve => {

      this.ejecutarQuery<RespuestaMDB>(`/genre/movie/list?a=1`)
      .subscribe( resp => {    
        this.generos = resp['genres'];
        //console.log(this.generos);
        resolve( this.generos );
      });
  });

  }

}
