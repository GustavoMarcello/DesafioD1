const axios = require ("axios").default
const {popularModel, upcomingModel, topRatedModel} = require("../db/mongoose")

class GetMovie {
    /**
     *
     * @param {{url: string, key: string}} param0
     */

    constructor({url, key}){
        this.client = axios.create({ baseURL: url})
        this.key = key
    }

    /**
     * 
     * @returns {{id: Number, title: string, release_date: string, poster_path: string, overview: string} []}
     */
    // requisição de filmes populares
    async getPopular (){
        try {
            const { data } = await this.client.get("movie/popular?api_key=" + this.key)
            const resultPopular = data.results.map((x) => {
                return {                   
                        id: x.id,
                        title: x.title,
                        release_date: x.release_date,
                        poster_path: `https://www.themoviedb.org/t/p/original${x.poster_path}`,
                        overview: x.overview
                }; 
            });
            // armazenando dados ao db
            new popularModel({list: resultPopular}).save()
            return resultPopular || []
        } catch (err) {
            console.error(err);
            return [];
        }
    }  
        /**
     * 
     * @returns {{id: Number, title: string, release_date: string, poster_path: string, overview: string} []}
     */
    // requisição de lançamentos
    async getUpcoming (){
        try {
            const { data } = await this.client.get("movie/upcoming?api_key=" + this.key)
            const resultUpcomming = data.results.map((x) => {
                return {
                    id: x.id,
                    title: x.title,
                    release_date: x.release_date,
                    poster_path: `https://www.themoviedb.org/t/p/original${x.poster_path}`,
                    overview: x.overview
                };
            });
            // armazenando dados ao db
            new upcomingModel({list: resultUpcomming}).save()
            return resultUpcomming || []
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    /**
     * 
     * @returns {{id: Number, title: string, release_date: string, poster_path: string, overview: string} []}
     */
    // requisição de melhores avaliados
    async getTopRated (){
        try {
            const { data } = await this.client.get("movie/top_rated?api_key=" + this.key)
            const resultTopRated = data.results.map((x) => {
                return {
                    id: x.id,
                    title: x.title,
                    release_date: x.release_date,
                    poster_path: `https://www.themoviedb.org/t/p/original${x.poster_path}`,
                    overview: x.overview
                };

            });
            // armazenando dados ao db
            new topRatedModel({list: resultTopRated}).save()
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


