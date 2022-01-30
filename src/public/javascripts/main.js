const url = "http://localhost:3000/api/v1/popular_movies"
const movies = []

axios.get(url)
    .then(response =>{
        const data = response.data
        console.log(data)
        const dFrag = document.createDocumentFragment();
        data.map(x => {
            const div = document.createElement('div')
            const moviePoster = document.createElement('img')
            div.setAttribute('class', 'item')
            moviePoster.setAttribute('class', 'box-conteudo')
            moviePoster.setAttribute('alt', x.title)
            moviePoster.setAttribute('src', x.poster_path)
            div.appendChild(moviePoster)

            dFrag.appendChild(div)
             
        })
        window.onload = () => {
            //write your code here
            document.getElementById('carousel').appendChild(dFrag);
        }  
        // document.getElementById('carousel').appendChild(dFrag);
        
        
        // renderApiResult.textContent = JSON.stringify(data)
    })
    .catch(error => console.log(error))


