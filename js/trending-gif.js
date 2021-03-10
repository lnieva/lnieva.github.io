// ------ CREA LOS TRENDING GIF ------
const trendingEndpoint = "https://api.giphy.com/v1/gifs/trending?api_key="

fetch(`${trendingEndpoint}${apiKey}`)
    .then(response => response.json())
    .then(response => {
        for (let i=0; i < 12; i++) {
            let imgGif = response.data[i].images.original.url
            const user = response.data[i].username
            const title = response.data[i].title
            const gifId = response.data[i].id
            let gifCard = document.createElement('div')
            gifCard.classList.add('container_gif')
            let createImg = document.getElementById("createImg")
            let box = document.createElement('img')
            box.src = imgGif
            box.classList.add('square_gif')
            createImg.appendChild(gifCard)
            gifCard.appendChild(box)

            hover_user_title_fav_down_max(user, title, imgGif, gifCard, gifId)
        }

    })
    .catch(error => {
        console.error(error)
        alert(`Hay un problema para visualizar los Trendings`)
    })

// ------ BOTONES SLIDER ------
document.querySelector('#slider-right').addEventListener("click", () => {
    document.querySelector('#createImg').scrollLeft += 500;
})
document.querySelector('#slider-left').addEventListener("click", () => {
     document.querySelector('#createImg').scrollLeft -= 500;
})