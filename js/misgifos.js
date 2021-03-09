const fullGif = document.querySelector('.fullGif')

let miGifs_list = JSON.parse(localStorage.getItem('misgifos'))

const loadGif = () => {
    for (let i=0; i < miGifs_list.length; i++) {
    fetch(`https://api.giphy.com/v1/gifs/${miGifs_list[i]}?api_key=${apiKey}`)
      .then(response => response.json())
      .then( response => {
            let imgGif = response.data.images.original.url
            const user = response.data.username
            const title = `Acamica - ${i}`
            let createImg = document.getElementById("localgif")
            let gifCard = document.createElement('div')
            gifCard.classList.add('container_gif')
            let box = document.createElement('img')
            box.src = imgGif
            box.classList.add('square_gif')
            createImg.appendChild(gifCard)
            gifCard.appendChild(box)

            hover_user_title_delete_down_max(user, title, imgGif, gifCard, miGifs_list[i])
        })  
    }
}

// Remove Gif
const removeGif = (array ,idGif) => {
    let myGifIndex = miGifs_list.indexOf(idGif);
    miGifs_list.splice(myGifIndex, 1)
    localStorage.setItem(array, JSON.stringify(miGifs_list))

    if (miGifs_list.length > 0) {
        document.querySelector('#misGifos_nocontent_img').classList.add('displaynone')
        document.querySelector('#misGifos_nocontent_title').classList.add('displaynone')
        removeAll()
        loadGif() 
    }else {
        document.querySelector('#misGifos_nocontent_img').classList.remove('displaynone')
        document.querySelector('#misGifos_nocontent_title').classList.remove('displaynone')
        removeAll()
    }   
}

// Cierra las imagenes maximizadas
const fullGifClose = document.querySelector('.fullGif__close')
fullGifClose.addEventListener('click', () => {
    document.querySelector('.content_img').remove()
    document.querySelector('.maximize_user').remove()
    document.querySelector('.maximize_title').remove()
    fullGif.classList.remove('show')
    document.querySelector('#gifos').classList.remove('displaynone')
})

// Cierra las imagenes maximizadas Dark
document.querySelector('.fullGif__close-dark').addEventListener('click', () => {
    document.querySelector('.content_img').remove()
    document.querySelector('.maximize_user').remove()
    document.querySelector('.maximize_title').remove()
    fullGif.classList.remove('show')
    document.querySelector('#gifos').classList.remove('displaynone')
})

// Maximizar las imagenes
function hover_user_title_delete_down_max (user, title, url, gifCardAll, idGif) {
    let gifUser = document.createElement('p');
    let gifTitle = document.createElement('p');
    let cuadro = document.createElement('div');
    cuadro.setAttribute("id", "cuadro");
    gifUser.setAttribute("id", "gifUser");
    gifTitle.setAttribute("id", "gifTitle");

    user_title_test(user, title, gifUser, gifTitle)

    let favorite = document.createElement('div')
    favorite.classList.add("delete_normal")
    let download = document.createElement('div')
    download.classList.add("download_normal")
    let second_max = document.createElement('div')
    second_max.classList.add("max_normal")

    gifCardAll.appendChild(gifUser)
    gifCardAll.appendChild(gifTitle)
    gifCardAll.appendChild(favorite)
    gifCardAll.appendChild(download)
    gifCardAll.appendChild(second_max)
    gifCardAll.appendChild(cuadro)

    // Maximiza el Gif
    second_max.addEventListener('click', () => {
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

        document.querySelector('#gifos').classList.add('displaynone')
    })

    download.addEventListener("click", () => {
        download_gif(url, title)
    })

    favorite.addEventListener('click', () => {
        removeGif("misgifos", idGif)
    })
}

// Click download Gif
async function download_gif (url_gif, title_gif) {
    let a = document.createElement('a');
    let response = await fetch(url_gif)
    let file = await response.blob();
    a.download = title_gif
    a.href = window.URL.createObjectURL(file);
    a.click()
}

// Remueve los gif
function removeAll () {
    let remove = document.querySelector("#localgif")
    while (remove.firstChild) {
        remove.removeChild(remove.lastChild)
    }
}

if (miGifs_list.length > 0) {
    document.querySelector('#misGifos_nocontent_img').classList.add('displaynone')
    document.querySelector('#misGifos_nocontent_title').classList.add('displaynone')
    loadGif()   
}else {
    document.querySelector('#misGifos_nocontent_img').classList.remove('displaynone')
    document.querySelector('#misGifos_nocontent_title').classList.remove('displaynone')
}

// // Dark Mode
// document.querySelector('.button_dark').addEventListener("click", () => {
//     document.body.classList.toggle('dark')
//     if ( document.body.classList[0]){
//         localStorage.setItem('body', 'dark');
//         document.querySelector('#close-dark').classList.remove('displaynone')
//         document.querySelector('#close').classList.add('displaynone')
//     }else{
//         localStorage.removeItem('body');
//         document.querySelector('#close-dark').classList.add('displaynone')
//         document.querySelector('#close').classList.remove('displaynone')
//     }
// })