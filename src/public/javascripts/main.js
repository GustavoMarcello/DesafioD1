const url = "http://localhost:3000/api/v1/popular_movies"


axios.get(url)
    .then(response =>{
        const data = response.data
        // renderApiResult.textContent = JSON.stringify(data)
    })
    .catch(error => console.log(error))


const filmes = [

]

const dFrag = document.createDocumentFragment();

filmes.map(t => {
    const div = document.createElement('div')
    // const filmeName = document.createElement('span')
    const p = document.createElement('img')
    // p.textContent = t.img
    // filmeName.textContent = t.nome
    // filmeName.setAttribute('class', 'tooltiptext')
    p.setAttribute('src', t.img)
    p.setAttribute('alt', t.nome)
    p.setAttribute('class', 'imagem')
    div.setAttribute('class', 'nova div')
    div.appendChild(p)
    
    dFrag.appendChild(div);
})

window.onload = () => {
    //write your code here
    document.getElementById('carousel').appendChild(dFrag);
}
