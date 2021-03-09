// ------ VARIABLES ------

const apiKey = "yTCjv2UMQEL7ayD0GnIrM7i1anyTY3Ov"
const urltrending = "https://api.giphy.com/v1/trending/searches?api_key="
const randomGif = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=`

// Remueve los gif
function removeAll () {
    let remove = document.querySelector(".result-search")
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
    if ( !document.body.classList[0]){
        document.getElementById("icon-search").style.display = "none"
        document.getElementById("close-search").style.display = "block"
        document.getElementById("icon-search_active").style.display = "block"
        document.getElementById("icon-search-dark").style.display = "none"
        document.getElementById("close-search-dark").style.display = "none"
        document.getElementById("icon-search_active-dark").style.display = "none"
    }else{
        document.getElementById("icon-search-dark").style.display = "none"
        document.getElementById("close-search-dark").style.display = "block"
        document.getElementById("icon-search_active-dark").style.display = "block"
        document.getElementById("icon-search").style.display = "none"
        document.getElementById("close-search").style.display = "none"
        document.getElementById("icon-search_active").style.display = "none"
    }
    
}

function icon_search_ok () {
    if ( !document.body.classList[0]){
        document.getElementById("icon-search").style.display = "block"
        document.getElementById("close-search").style.display = "none"
        document.getElementById("icon-search_active").style.display = "none"
        document.getElementById("icon-search-dark").style.display = "none"
        document.getElementById("close-search-dark").style.display = "none"
        document.getElementById("icon-search_active-dark").style.display = "none"
    }else{
        document.getElementById("icon-search-dark").style.display = "block"
        document.getElementById("close-search-dark").style.display = "none"
        document.getElementById("icon-search_active-dark").style.display = "none"
        document.getElementById("icon-search").style.display = "none"
        document.getElementById("close-search").style.display = "none"
        document.getElementById("icon-search_active").style.display = "none"
    }
    
}

// Verifica si no esta vacio el usuario y el titlo del Gif
function user_title_test (user_test, title_test, user_var, title_var) {
    if (!user_test == "") {
        user_var.textContent = `${user_test}`
    }else{
        user_var.textContent = "Acamica"
    }
    if (!title_test == "") {
        title_var.textContent = `${title_test}`
    }else{
        title_var.textContent = "No Title"
    }
}

// Maximizar las imagenes
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

// Dark Mode
document.querySelector('.button_dark').addEventListener("click", () => {
    document.body.classList.toggle('dark')
    if ( document.body.classList[0]){
        localStorage.setItem('body', 'dark');
        document.querySelector('#close-dark').classList.remove('displaynone')
        document.querySelector('#close').classList.add('displaynone')
    }else{
        localStorage.removeItem('body');
        document.querySelector('#close-dark').classList.add('displaynone')
        document.querySelector('#close').classList.remove('displaynone')
    }
})

// Verifica el modo Dark
function body_dark () {
    const dark = localStorage.getItem("body");
    if (dark === "dark") {
            document.body.classList.add('dark')
            document.querySelector('#burger-dark').classList.remove('displaynone')
    }else{
        document.body.classList.remove('dark')
    }
}
body_dark()