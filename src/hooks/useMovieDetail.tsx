import { useState, useEffect } from 'react';
import { movieDB } from '../api/movieDB';
import { MovieFullDetail } from '../interfaces/movieFullDetailInterface';
import { Credits, Cast } from '../interfaces/creditsInterface';

interface MovieDetails {
    isLoadingMovie: boolean;
    movieFull: MovieFullDetail,
    castMovie: any[];
}

export const useMovieDetail = (movie: any) => {

    const [state, setstate] = useState<MovieDetails>({
        isLoadingMovie: true,
        movieFull: undefined,
        castMovie: [],
    });

    const getMovieDetails = async () => {
        if (movie.title) {
            const movieDetailPromise = await movieDB.get<MovieFullDetail>(`/${movie.id}`)
            const castPromise = await movieDB.get<Credits>(`/${movie.id}/credits`)

            const [movieDetailResponse, castResponse] = await Promise.all([movieDetailPromise, castPromise])

            setstate({
                isLoadingMovie: false,
                movieFull: movieDetailResponse.data,
                castMovie: castResponse.data.cast,
            })
        }
    }

    useEffect(() => {
        getMovieDetails();
    }, [])

    return {
        ...state
    }

}