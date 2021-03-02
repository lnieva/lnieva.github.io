// ------ CREA LOS TRENDING GIF ------

function hover_user_title_fav_down_max (user, title, url, gifCardAll) {
    let gifUser = document.createElement('p');
    let gifTitle = document.createElement('p');
    let cuadro = document.createElement('div');
    cuadro.setAttribute("id", "cuadro");
    gifUser.setAttribute("id", "gifUser");
    gifTitle.setAttribute("id", "gifTitle");

    user_title_test(user, title, gifUser, gifTitle)

    let favorite = document.createElement('div')
    favorite.classList.add("favorite_normal")
    let download = document.createElement('div')
    download.classList.add("download_normal")
    let max = document.createElement('div')
    max.classList.add("max_normal")

    gifCardAll.appendChild(gifUser)
    gifCardAll.appendChild(gifTitle)
    gifCardAll.appendChild(favorite)
    gifCardAll.appendChild(download)
    gifCardAll.appendChild(max)
    gifCardAll.appendChild(cuadro)

    // Maximiza el Gif
    max.addEventListener('click', () => {
        fullGif.classList.add('show')
        const content = document.querySelector('.maximize_user_title_img')
        const maximize_img = document.createElement('img')
        maximize_img.classList.add('content_img')
        maximize_img.src = url
        const maximize_user_title = document.querySelector('.maximize_user_title')
        const maximize_user = document.createElement('p')
        maximize_user.classList.add('maximize_user')
        const maximize_title = document.createElement('h3')
        maximize_title.classList.add('maximize_title')

        user_title_test(user, title, maximize_user, maximize_title)

        content.before(maximize_img)
        maximize_user_title.appendChild(maximize_user)
        maximize_user_title.appendChild(maximize_title)

        document.querySelector('.maximize_icon_download').addEventListener("click", () => {
            download_gif(url, title)
        })

        document.querySelector('#gifos').classList.add('displaynone')
        //document.querySelector('#footer').classList.add('displaynone')

    })

    // Descarga el Gif
    download.addEventListener("click", () => {
        download_gif(url, title)
    })
}

const trendingEndpoint = "https://api.giphy.com/v1/gifs/trending?api_key="

fetch(`${trendingEndpoint}${apiKey}`)
    .then(response => response.json())
    .then(response => {
        for (let i=0; i < 20; i++) {
            let imgGif = response.data[i].images.original.url
            const user = response.data[i].username
            const title = response.data[i].title
            let gifCard = document.createElement('div')
            gifCard.classList.add('container_gif')
            let createImg = document.getElementById("createImg")
            let box = document.createElement('img')
            box.src = imgGif
            box.classList.add('square_gif')
            createImg.appendChild(gifCard)
            gifCard.appendChild(box)

            hover_user_title_fav_down_max(user, title, imgGif, gifCard) 
        }
    })