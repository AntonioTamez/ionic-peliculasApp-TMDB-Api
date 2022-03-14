import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core'; 
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;
  peliculas : PeliculaDetalle[] =[];

  constructor(private storage: Storage,
              private toastCtrl: ToastController) {
    this.initDB();
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  async initDB(){
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarPelicula(pelicula: PeliculaDetalle){
 
    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if(peli.id === pelicula.id){
        existe = true;
         break;
      }
    }

    console.log('existe',existe, pelicula.id);

    if( existe ){
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
    }
 
    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);

    return !existe;
 
    }

    async cargarFavoritos(){
      const peliculas = await this.storage.get('peliculas');
      this.peliculas = peliculas || [];
      return this.peliculas;
    }

    async existePelicula( id ){
      id = Number(id);

      await this.cargarFavoritos();
      const existe = this.peliculas.find( peli => peli.id === id );
      return (existe) ? true : false;
    }

  }

 
