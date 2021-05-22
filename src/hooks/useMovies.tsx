import React, { useEffect, useState } from 'react'
import { movieDB, genresDB } from '../api/movieDB'
import { MovieDBMoviesResponse, Movie, } from '../interfaces/movieDBinterface';
import { GenresInterface, GenreInterface } from '../interfaces/genresInterface';

interface MovieState {
  nowPlaying: Movie[],
  // nowPlaying: any, //uncomment for render alternative
  populars: Movie[],
  topRated: Movie[],
  upcoming: Movie[],
}

interface GenreState {
  genres: GenreInterface[],
}

export const useMovies = () => {

  const [isLoadingMovies, setIsLoading] = useState(true)
  const [genres, setGenres] = useState<GenreState>()
  const [movies, setMovies] = useState<MovieState>({
    nowPlaying: [],
    populars: [],
    topRated: [],
    upcoming: [],
  })

  const getMovies = async () => {
    const nowPlayingPromise = await movieDB.get<MovieDBMoviesResponse>('/now_playing')
    const popularsPromise = await movieDB.get<MovieDBMoviesResponse>('/popular')
    const topRatedPromise = await movieDB.get<MovieDBMoviesResponse>('/top_rated')
    const upcomingPromise = await movieDB.get<MovieDBMoviesResponse>('/upcoming')
    const res = await Promise.all([nowPlayingPromise, popularsPromise, topRatedPromise, upcomingPromise])
    setMovies({
      // nowPlaying: [{ id: 'left-spacer' }, ...res[0].data.results, { id: 'right-spacer' }], //uncomment for render alternative
      nowPlaying: res[0].data.results,
      populars: res[1].data.results,
      topRated: res[2].data.results,
      upcoming: res[3].data.results,
    })
    setIsLoading(false);
  }

  const getGenres = async () => {
    const movieGenres = await genresDB.get<GenresInterface>('/list')
    setGenres(movieGenres.data);
  }

  useEffect(() => {
    getMovies();
    getGenres();
  }, [])

  return {
    ...movies,
    isLoadingMovies,
    ...genres,
  }
}
