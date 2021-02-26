// ------ CREA LOS TRENDING GIF ------

const trendingEndpoint = "https://api.giphy.com/v1/gifs/trending?api_key="

fetch(`${trendingEndpoint}${apiKey}`)
    .then(response => response.json())
    .then(response => {
        for (let i=0; i < 20; i++) {
            let imgGif = response.data[i].images.original.url
            let createImg = document.getElementById("createImg")
            let box = document.createElement('img')
            box.src = imgGif
            box.classList.add('square')
            box.setAttribute("id", `imgGif${[i]}`);
            createImg.appendChild(box)
        }
    })