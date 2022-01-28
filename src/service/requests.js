const axios = require ("axios").default

class GetMovie {
    /**
     *
     * @param {{url: string, token: string}} param0
     */

    constructor({url, token}){
        this.client = axios.create({ baseURL: url})
        this.token = token
    }

    async getPopular (){
        try {
            const { data } = await this.client.get("movie/popular?api_key=" + this.token)
            const resultPopular = data?.results?.map((x) => {
                return {
                    id: x.id,
                    title: x.title,
                    release_date: x.release_date,
                    poster_path: x.poster_path,
                    overview: x.overview
                };
            });
            // console.log(result)

            return resultPopular || []
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async getUpcoming (){
        try {
            const { data } = await this.client.get("movie/upcoming?api_key=" + this.token)
            const resultUpcomming = data?.results?.map((x) => {
                return {
                    id: x.id,
                    title: x.title,
                    release_date: x.release_date,
                    poster_path: x.poster_path,
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
            const { data } = await this.client.get("movie/top_rated?api_key=" + this.token)
            const resultTopRated = data?.results?.map((x) => {
                return {
                    id: x.id,
                    title: x.title,
                    release_date: x.release_date,
                    poster_path: x.poster_path,
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


