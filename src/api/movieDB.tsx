import axios from 'axios';
import { apiKey } from './key';

export const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: apiKey,
    append_to_response: 'videos,images',
  }
})

export const genresDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/genre/movie',
  params: {
    api_key: apiKey,
    language: 'en-US',
  }
})

export const serieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/tv',
  params: {
    api_key: apiKey,
    append_to_response: 'videos,images',
  }
})
