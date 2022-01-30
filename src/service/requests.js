const axios = require ("axios").default
require('dotenv').config()
const TMDB_KEY = process.env.TMDB_KEY

class GetMovie {
    /**
     *
     * @param {{url: string, token: string}} param0
     */

    constructor({url, token}){
        this.client = axios.create({ baseURL: url})
    }

    /**
     * 
     * @returns {Array}
     */
    async getPopular (){
        try {
            const { data } = await this.client.get("movie/popular?api_key=" + TMDB_KEY)
            const resultPopular = data.results.map((x) => {
                return {
                    id: x.id,
                    title: x.title,
                    release_date: x.release_date,
                    poster_path: `https://www.themoviedb.org/t/p/original${x.poster_path}`,
                    overview: x.overview
                };
            });

            return resultPopular || []
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async getUpcoming (){
        try {
            const { data } = await this.client.get("movie/upcoming?api_key=" + TMDB_KEY)
            const resultUpcomming = data.results.map((x) => {
                return {
                    id: x.id,
                    title: x.title,
                    release_date: x.release_date,
                    poster_path: `https://www.themoviedb.org/t/p/original${x.poster_path}`,
                    overview: x.overview
                };
            });
            // console.log(result)

            return resultUpcomming || []
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async getTopRated (){
        try {
            const { data } = await this.client.get("movie/top_rated?api_key=" + TMDB_KEY)
            const resultTopRated = data.results.map((x) => {
                return {
                    id: x.id,
                    title: x.title,
                    release_date: x.release_date,
                    poster_path: `https://www.themoviedb.org/t/p/original${x.poster_path}`,
                    overview: x.overview
                };
            });
            // console.log(result)

            return resultTopRated || []
        } catch (err) {
            console.error(err);
            return [];
        }
    }

}

module.exports = {
    GetMovie
}


