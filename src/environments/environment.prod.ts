import { config } from '../../config';

export const environment = {
  production: true,
  url: 'https://api.themoviedb.org/3',
  apiKey: config.API_KEY,
  imgPath: 'https://image.tmdb.org/t/p'
};
