import React, { useEffect, useState } from 'react'
import { genresDB, serieDB } from '../api/movieDB';
import { GenresInterface, GenreInterface } from '../interfaces/genresInterface';
import { Serie, SerieDBSeriesResponse } from '../interfaces/serieDBinterface';

interface SerieState {
  airingTodaySeries: Serie[];
  popularsSeries: Serie[];
  topRatedSeries: Serie[];
}

interface GenreState {
  genres: GenreInterface[],
}

export const useSeries = () => {
  const [isLoadingSeries, setIsLoadingSeries] = useState(true)
  const [genres, setGenres] = useState<GenreState>()
  const [series, setSeries] = useState<SerieState>({
    airingTodaySeries: [],
    popularsSeries: [],
    topRatedSeries: [],
  })

  const getSeries = async () => {
    const airingTodayPromise = await serieDB.get<SerieDBSeriesResponse>('/airing_today')
    const popularsPromise = await serieDB.get<SerieDBSeriesResponse>('/popular')
    const topRatedPromise = await serieDB.get<SerieDBSeriesResponse>('/top_rated')
    const res = await Promise.all([airingTodayPromise, popularsPromise, topRatedPromise])
    setSeries({
      airingTodaySeries: res[0].data.results,
      popularsSeries: res[1].data.results,
      topRatedSeries: res[2].data.results,
    })
    setIsLoadingSeries(false);
  }

  const getGenres = async () => {
    const seriesGenres = await genresDB.get<GenresInterface>('/list')
    setGenres(seriesGenres.data);
  }

  useEffect(() => {
    setTimeout(() => {
      getSeries();
      getGenres();
    }, 0);
  }, [])

  return {
    ...series,
    isLoadingSeries,
    ...genres,
  }
}
