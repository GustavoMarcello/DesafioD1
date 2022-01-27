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
    async getMovieById (){
        const response = await this.client.get("movie/550?api_key=" + this.token)
        console.log(response)
        return response
    }

    async getPopularMovies (){
        try {
            const { data } = await this.client.get("movie/popular?api_key=" + this.token)
            const result = data?.results?.map((x) => {
                return {
                    id: x.id,
                    title: x.title,
                    release_date: x.release_date,
                    poster_path: x.poster_path,
                    overview: x.overview
                };
            });
            // console.log(result)

            return result || []
        } catch (err) {
            console.error(err);
            return [];
        }
    }

}

module.exports = {
    GetMovie
}


