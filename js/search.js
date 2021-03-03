// ------ SEARCH GIF  ------

const searchGif = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=`
const search_Autocomplete__lupa_item = document.querySelector('.searchAutocomplete')
const fullGif = document.querySelector('.fullGif')

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

    // busca los gif y los muestra
    const numbers = []
    let promiseList = []

    for (let i=0; i < 48; i++) {
        let random = Math.floor(Math.random()*50)
        numbers.push(random)
    }

    const gifPush = fetch(`${searchGif}${namegif}`)
        .then(response => response.json())
            promiseList.push(gifPush)

    let createImg = document.querySelector(".result-search")
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

        // Verifica si esta vacio el usuario y el titulo
        user_title_test(user, title, gifUser, gifTitle)

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

            // Verifica si esta vacio el usuario y el titulo
            user_title_test(user, title, maximize_user, maximize_title)

            content.before(maximize_img)
            maximize_user_title.appendChild(maximize_user)
            maximize_user_title.appendChild(maximize_title)
        })

        //Download desde el hover
        download.addEventListener("click", () => {
            download_gif(url, title)
        })

        createImg.appendChild(gifCard)

        button_view_active()

    }

    Promise.all(promiseList)
    .then(response => {
        if(!response[0].data.length == "0" ){
            check_namegif("none")
            if (!response[0].data == ""){
                let cant = document.querySelectorAll('.result-search > div').length
                if ( cant <= 48 ) {
                    const data = numbers.slice(0,12)
                        data.forEach(gif => {
                        const user = response[0].data[gif].username
                        const title = response[0].data[gif].title
                        const url = response[0].data[gif].images.original.url
                        showGif(user, title, url)
                        })
                }else{
                    alert('El limite de busqueda son 48 Gif')
                }
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
            changeDisplay_search_ok()
        }else{
            changeDisplay_search_ok()
            check_namegif("none")
        }
    })
}

// Click en el lupa
document.getElementById("icon-search").addEventListener("click", () => {
    icon_search_close()
    removeAll()
    search_gifos()
})

document.getElementById("icon-search_active").addEventListener("click", () => {
    removeAll()
    search_gifos() 
})

// Click en el lupa Dark
document.getElementById("icon-search-dark").addEventListener("click", () => {
    icon_search_close()
    removeAll()
    search_gifos()
})

document.getElementById("icon-search_active-dark").addEventListener("click", () => {
    removeAll()
    search_gifos()
})

// Click en el Close 
document.getElementById("close-search").addEventListener("click", () => {
    icon_search_ok()
    changeDisplay_search_ok()
    search_Autocomplete__lupa_item.innerHTML = ''
    removeAll()
    button_view_disable()
    let check_error = document.getElementsByClassName("display")
    for (let i=0; i < check_error.length; i++) {
        check_error[i].style.display = "none"
    }
})

// Click en el Close Dark
document.getElementById("close-search-dark").addEventListener("click", () => {
    icon_search_ok()
    changeDisplay_search_ok()
    search_Autocomplete__lupa_item.innerHTML = ''
    removeAll()
    button_view_disable()
    let check_error = document.getElementsByClassName("display")
    for (let i=0; i < check_error.length; i++) {
        check_error[i].style.display = "none"
    }
})

// Habilitamos la tecla enter en la busqueda
var input = document.getElementById("intro");
input.addEventListener("keyup", function(event) {
    //icon_search_close()
    if (event.keyCode === 13) {
        search_gifos()
    }
});

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

// Click Download Search/trendings
document.querySelector('.maximize_icon_download').addEventListener("click", () => {
    download_gif(document.querySelector('.content_img').src, document.querySelector('.maximize_title').innerHTML)
})

// Boton Ver Mas
document.querySelector('.button_view__img').addEventListener("click", () => {
    search_gifos()
})

document.querySelector('.button_view__img_noct').addEventListener("click", () => {
    search_gifos()
})


// Dark Mode
document.querySelector('.button_dark').addEventListener("click", () => {
    document.body.classList.toggle('dark')
    if ( document.body.classList[0]){
        localStorage.setItem('body', 'dark');
    }else{
        localStorage.removeItem('body');
    }
})