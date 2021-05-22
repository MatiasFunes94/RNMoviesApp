import { useState, useEffect } from 'react';
import { serieDB } from '../api/movieDB';
import { Credits } from '../interfaces/creditsInterface';
import { SerieFullDetail } from '../interfaces/serieFullDetailInterface';
import { Serie } from '../interfaces/serieDBinterface';

interface SerieDetails {
  isLoadingSerie: boolean;
  serieFull: SerieFullDetail,
  castSerie: any[];
}

export const useSerieDetail = (serie: Serie) => {

  const [state, setstate] = useState<SerieDetails>({
    isLoadingSerie: true,
    serieFull: undefined,
    castSerie: [],
  });

  const getSerieDetails = async () => {
    if (serie.name) {
      const serieDetailPromise = await serieDB.get<SerieFullDetail>(`/${serie.id}`)
      const castPromise = await serieDB.get<Credits>(`/${serie.id}/credits`)

      const [serieDetailResponse, castResponse] = await Promise.all([serieDetailPromise, castPromise])
      setstate({
        isLoadingSerie: false,
        serieFull: serieDetailResponse.data,
        castSerie: castResponse.data.cast,
      })
    }
  }

  useEffect(() => {
    getSerieDetails();
  }, [])

  return {
    ...state
  }

}