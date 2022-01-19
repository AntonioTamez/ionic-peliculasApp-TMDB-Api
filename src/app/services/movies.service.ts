import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getFeature(){
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-01-01&primary_release_date.lte=2022-02-01&api_key=feb24f7bf104963a87d169004a10db25&language=es&include_image_language=es`);
  
  }

}
