const url = "http://localhost:3000/api/v1/popular_movies"

function getPopularMovies(){
    axios.get(url)
        .then(response =>{
            const data = response.data

            // renderApiResult.textContent = JSON.stringify(data)
            titles.textContent = JSON.stringify(data[0].title)
        })
        .catch(error => console.log(error))
}

getPopularMovies()
