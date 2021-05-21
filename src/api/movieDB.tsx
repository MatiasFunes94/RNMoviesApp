import axios from 'axios';

export const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '0d99d3efe9d677cf3d562abcfa677825',
        append_to_response: 'videos,images',
    }
})

export const genresDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/genre/movie',
    params: {
        api_key: '0d99d3efe9d677cf3d562abcfa677825',
        language: 'en-US',
    }
})

export const serieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/tv',
    params: {
        api_key: '0d99d3efe9d677cf3d562abcfa677825',
        append_to_response: 'videos,images',
    }
})
