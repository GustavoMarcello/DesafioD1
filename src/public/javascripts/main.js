const url = "http://localhost:3000/api/v1/popular_movies"

function getPopular(){
    axios.get(url)
        .then(response =>{
            const data = response.data

            renderApiResult.textContent = JSON.stringify(data)
        })
        .catch(error => console.log(error))
}

getPopular()
