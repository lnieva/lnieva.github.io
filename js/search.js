// ------ SEARCH GIF  ------

const searchGif = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=`
const search_Autocomplete__lupa_item = document.querySelector('.searchAutocomplete')
const fullGif = document.querySelector('.fullGif')

// Remueve los gif
function removeAll () {
    let remove = document.getElementById("result-search")
    while (remove.firstChild) {
        remove.removeChild(remove.lastChild)
    }
}

// Trabajo de display en Lupa y Close
function changeDisplay_search_ok () {
    document.getElementById("linea-search-ok").style.display = "none"
    document.getElementById("title-search-ok").style.display = "none"
}

function icon_search_close () {
    document.getElementById("icon-search").style.display = "none"
    document.getElementById("close-search").style.display = "block"
    document.getElementById("icon-search_active").style.display = "block"
}

function icon_search_ok () {
    document.getElementById("icon-search").style.display = "block"
    document.getElementById("close-search").style.display = "none"
    document.getElementById("icon-search_active").style.display = "none"
}

// Funcion de Search de Gifos
function search_gifos () {

    let namegif = document.getElementById("intro").value;

    //Oculta la pagina de error
    function check_namegif (type_display) {
        let check_error = document.getElementsByClassName("display")
            for (let i=0; i < check_error.length; i++) {
                document.getElementById("title-search").textContent = namegif
                check_error[i].style.display = type_display
            }
    }

    // Remueve los gif
    removeAll()

    // busca los gif y los muestra
    const numbers = []
    let promiseList = []

    for (let i=0; i < 12; i++) {
        let random = Math.floor(Math.random()*50)
        numbers.push(random)
    }

    const gifPush = fetch(`${searchGif}${namegif}`)
        .then(response => response.json())
            promiseList.push(gifPush)

    let createImg = document.getElementById("result-search")
    const showGif = (user, title, url) => {
        let gifCard = document.createElement('div')
        let lineSearch = document.getElementById("line-result")
        lineSearch.style.display = "flex"
        let titleSearch = document.getElementById("title-search-ok")
        titleSearch.textContent = namegif
        let gifImage = document.createElement('img')
        gifCard.classList.add('container_gif')
        gifImage.classList.add('square_gif')
        gifImage.src = url
        let gifUser = document.createElement('p');
        let gifTitle = document.createElement('p');
        let cuadro = document.createElement('div');
        cuadro.setAttribute("id", "cuadro");
        gifUser.setAttribute("id", "gifUser");
        gifTitle.setAttribute("id", "gifTitle");
        if (!user == "") {
            gifUser.textContent = `${user}`
        }else{
            gifUser.textContent = "Acamica"
        }
        if (!title == "") {
            gifTitle.textContent = `${title}`
        }else{
            gifTitle.textContent = "No Title"
        }
        let favorite = document.createElement('div')
        favorite.classList.add("favorite_normal")
        let download = document.createElement('div')
        download.classList.add("download_normal")
        let max = document.createElement('div')
        max.classList.add("max_normal")
        document.getElementById("linea-search-ok").style.display = "block"
        document.getElementById("title-search-ok").style.display = "block"

        gifCard.appendChild(gifUser)
        gifCard.appendChild(gifTitle)
        gifCard.appendChild(favorite)
        gifCard.appendChild(download)
        gifCard.appendChild(max)
        gifCard.appendChild(gifImage)
        gifCard.appendChild(cuadro)
        
        // Maximizar las imagenes
        max.addEventListener('click', () => {
            const imageUrl = url
            fullGif.classList.add('show')
            const content = document.createElement('div')
            content.classList.add('content')
            const image = document.createElement('img')
            image.src = imageUrl
            const maximize_user = document.createElement('p')
            maximize_user.classList.add('maximize_user')
            if (!user == "") {
                maximize_user.textContent = `${user}`
            }else{
                maximize_user.textContent = "Acamica"
            }
            const maximize_title = document.createElement('h3')
            maximize_title.classList.add('maximize_title')
            if (!title == "") {
                maximize_title.textContent = `${title}`
            }else{
                maximize_title.textContent = "No Title"
            }
            content.appendChild(image)
            content.appendChild(maximize_user)
            content.appendChild(maximize_title)
            document.querySelector('.fullGif__close').before(content)
        })

        createImg.appendChild(gifCard)

    }

    Promise.all(promiseList)
    .then(response => {
        if(!response[0].data.length == "0" ){
            check_namegif("none")
            if (!response[0].data == ""){
                numbers.forEach(gif => {
                    const user = response[0].data[gif].username
                    const title = response[0].data[gif].title
                    const url = response[0].data[gif].images.original.url
                    showGif(user, title, url)
                })
            }
        }else{
            numbers.forEach(gif => {
            const url = response[0].data[gif].title
        }) 
    }
    })
    .catch( error => {
        console.log(error)
        if (!namegif == ""){
            check_namegif("flex")
        }else{
            changeDisplay_search_ok()
            check_namegif("none")
        }
    })
}

// Click en el lupa
document.getElementById("icon-search").addEventListener("click", () => {
    icon_search_close()
    search_gifos()
})

document.getElementById("icon-search_active").addEventListener("click", () => {
    search_gifos() 
})

// Click en el Close
document.getElementById("close-search").addEventListener("click", () => {
    icon_search_ok()
    changeDisplay_search_ok()
    search_Autocomplete__lupa_item.innerHTML = ''
    removeAll()
    let check_error = document.getElementsByClassName("display")
    for (let i=0; i < check_error.length; i++) {
        check_error[i].style.display = "none"
    }
})

// Habilitamos en enter en la busqueda
var input = document.getElementById("intro");
input.addEventListener("keyup", function(event) {
    //icon_search_close()
    if (event.keyCode === 13) {
        search_gifos()
}
});

// Close las imagenes maximizadas
const fullGifClose = document.querySelector('.fullGif__close')
    fullGifClose.addEventListener('click', () => {
        fullGif.querySelector('.content').remove()
        fullGif.classList.remove('show')
    })