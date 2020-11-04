import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movies } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar = '';
  buscando = false;
  peliculas: Movies[] = [];
  ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los anillos', 'La vida es bella'];

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) { }

  buscar(event: any) {
    this.buscando = true;
    const valor: string = event.detail.value;

    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.moviesService.buscarPeliculas(valor).subscribe(res => {
      console.log(res);
      // tslint:disable-next-line: no-string-literal
      this.peliculas = res['results'];
      this.buscando = false;
    });
  }

  async detalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id }
    });
    return await modal.present();
  }

}
