const popularMovies = "http://localhost:3000/api/v1/popular_movies"
const upcommingMovies = "http://localhost:3000/api/v1/upcoming_movies"
const topMovies = "http://localhost:3000/api/v1/top_movies"
const slider0 = document.querySelector(".slider0");
const slider1 = document.querySelector(".slider1");
const slider2 = document.querySelector(".slider2");

function populateSlider(movies) {
    movies.forEach((image) => {
      // Clone the initial movie thats included in the html, then replace the image with a different one
      const newMovie = document.getElementById("movie0");
      const clone = newMovie.cloneNode(true);
      const img = clone.querySelector("img");
      img.src = image.poster_path;
  
      slider0.insertBefore(clone, slider0.childNodes[slider0.childNodes.length - 1]);
    });
}

function upcomingSlider(movies) {
    movies.forEach((image) => {
        // Clone the initial movie thats included in the html, then replace the image with a different one
        const newMovie = document.getElementById("movie1");
        const clone = newMovie.cloneNode(true);
        const img = clone.querySelector("img");
        img.src = image.poster_path;
    
        slider1.insertBefore(clone, slider1.childNodes[slider1.childNodes.length - 1]);
      });
}
function topSlider(movies) {
    movies.forEach((image) => {
        // Clone the initial movie thats included in the html, then replace the image with a different one
        const newMovie = document.getElementById("movie2");
        const clone = newMovie.cloneNode(true);
        const img = clone.querySelector("img");
        img.src = image.poster_path;
    
        slider2.insertBefore(clone, slider2.childNodes[slider2.childNodes.length - 1]);
      });
}

axios.get(popularMovies)
    .then(response =>{
        const data = response.data
        console.log(data)
        populateSlider(data)
        const initialMovie = document.getElementById("movie0");
        initialMovie.remove();
        
    })
    .catch(error => console.log(error))

axios.get(upcommingMovies)
    .then(response =>{
        const data = response.data
        console.log(data)
        upcomingSlider(data)
        const initialMovie = document.getElementById("movie1");
        initialMovie.remove();
        
    })
    .catch(error => console.log(error))

axios.get(topMovies)
    .then(response =>{
        const data = response.data
        console.log(data)
        topSlider(data)
        const initialMovie = document.getElementById("movie2");
        initialMovie.remove();
        
    })
    .catch(error => console.log(error))
