const API_KEY = '6292d742be89c435aebcb11824f20352';
const API_BASE = 'https://api.themoviedb.org/3';

/* The fetch is an interface for fetching resources 
   Json file contains a complex data which have array up-to first and second level*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
      return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Popular on Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=en&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Trending Now',
                items: await basicFetch(`/trending/all/week?language=en&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Top Rated Today',
                items: await basicFetch(`/movie/top_rated?language=en&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Action',
                items: await basicFetch(`/discover/movie?with_genres=28&language=en&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comedy',
                items: await basicFetch(`/discover/movie?with_genres=35&language=en&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Horror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=en&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=en&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentary',
                items: await basicFetch(`/discover/movie?with_genres=99&language=en&api_key=${API_KEY}`)
            }
        ]
    },

         getMovieInfo: async (movieId, type) => {
             let info = {};

               if(movieId){
                   switch(type){
                       case 'movie':
                           info = await basicFetch(`/movie/${movieId}?language=en-US&api_key=${API_KEY}`);
                       break;

                       case 'tv':
                           info = await basicFetch(`/tv/${movieId}?language=en-US&api_key=${API_KEY}`);
                       break;
                       default:
                           info = null;
                        break;
                   }
               }
               return info;
         }
}