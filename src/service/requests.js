const axios = require ("axios").default

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
     * @returns {Array}
     */
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

            return resultPopular || []
        } catch (err) {
            console.error(err);
            return [];
        }
    }

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

            return resultUpcomming || []
        } catch (err) {
            console.error(err);
            return [];
        }
    }

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


