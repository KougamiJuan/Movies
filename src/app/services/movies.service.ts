import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseMovieDB, MovieDetail, ResponseCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getPopulares() {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<ResponseMovieDB>(query);
  }

  buscarPeliculas(texto: string) {
    return this.ejecutarQuery(`/search/movie?query=${texto}`);
  }

  getFeature() {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
    return this.ejecutarQuery<ResponseMovieDB>(`/discover/movie?primary_release_date.gte=${startOfMonth}&primary_release_date.lte=${endOfMonth}`);
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<MovieDetail>(`/movie/${id}?a=1`);
  }

  getActores(id: string) {
    return this.ejecutarQuery<ResponseCredits>(`/movie/${id}/credits?a=1`);
  }

  cargarGeneros(): Promise<Genre[]> {
    return new Promise(resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe((res: MovieDetail) => {
        this.generos = res.genres;
        resolve(this.generos);
      });
    });
  }

}
