const movies = [
    {url: 'http://localhost:3000/api/v1/popular_movies', slider: document.querySelector(".slider0"), id: 'movie0', movieClass: '.movie0', indicator: document.querySelectorAll(".indicator"), btnRight: document.getElementById("moveRight0"), btnLeft: document.getElementById("moveLeft0")},
    {url: 'http://localhost:3000/api/v1/upcoming_movies', slider: document.querySelector(".slider1"), id: 'movie1', movieClass: '.movie1', indicator: document.querySelectorAll(".indicator1"), btnRight: document.getElementById("moveRight1"), btnLeft: document.getElementById("moveLeft1")},
    {url: 'http://localhost:3000/api/v1/top_movies', slider: document.querySelector(".slider2"), id: 'movie2', movieClass: '.movie2', indicator: document.querySelectorAll(".indicator2"), btnRight: document.getElementById("moveRight2"), btnLeft: document.getElementById("moveLeft2")}
]
// Update the indicators that show which page we're currently on
function updateIndicators(index) {
    for(let indicators of movies) {
        indicators.indicator.forEach((indicator) => {
            indicator.classList.remove("active");
          });
          let newActiveIndicator = indicators.indicator[index];
          newActiveIndicator.classList.add("active");
    }
    
  }
class CarouselMovies {
    /**
     * 
     * @param {String} slider 
     * @param {String} id 
     * @param {Object} data 
     */
    carouselSlider(slider, id, data) {
        data.forEach((image) => {
        // Clone the initial movie thats included in the html, then replace the image with a different one
            const newMovie = document.getElementById(id);
            const clone = newMovie.cloneNode(true);
            const img = clone.querySelector("img");
            img.src = image.poster_path;
            img.alt = image.title
        
            slider.insertBefore(clone, slider.childNodes[slider.childNodes.length - 1]);
        });
    }
}

const carouselMovies = new CarouselMovies()

let activeIndex = 0; // the current page on the slider
movies.map(x => {
    axios.get(x.url)
        .then(response =>{
            const data = response.data
                carouselMovies.carouselSlider(x.slider, x.id, data)
                carouselMovies.carouselSlider(x.slider, x.id, data)
                const initialMovie = document.getElementById(x.id);
                initialMovie.remove();  
            })
        .catch(error => console.log(error))
})

// Scroll Left button
movies.map(x => {
    x.btnLeft.addEventListener("click", (e) => {
        let movieWidth = document.querySelector(x.movieClass).getBoundingClientRect()
          .width;
        let scrollDistance = movieWidth * 6; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)
      
        x.slider.scrollBy({
          top: 0,
          left: -scrollDistance,
          behavior: "smooth",
        });
        activeIndex = (activeIndex - 1) % 3;
        
        updateIndicators(activeIndex);
    });
    
      // Scroll Right button
    x.btnRight.addEventListener("click", (e) => {
        
        let movieWidth = document.querySelector(x.movieClass).getBoundingClientRect()
            .width;
        let scrollDistance = movieWidth * 6; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)
    
        // if we're on the last page
        if (activeIndex == 3) {
        // duplicate all the items in the slider (this is how we make 'looping' slider)
            x.slider.scrollBy({
                top: 0,
                left: +scrollDistance,
                behavior: "smooth",
            });
            activeIndex = 0;
            updateIndicators(activeIndex);
        } else {
            x.slider.scrollBy({
                top: 0,
                left: +scrollDistance,
                behavior: "smooth",
        });
        activeIndex = (activeIndex + 1) % 3;
        console.log(activeIndex);
        updateIndicators(activeIndex);
        }
    });
})

      