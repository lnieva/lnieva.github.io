

document.getElementById("icon-search").addEventListener('click', () => { 

        function check_namegif (type_display) {
            let check_error = document.getElementsByClassName("display")
                for (let i=0; i < check_error.length; i++) {
                    document.getElementById("title-search").textContent = namegif
                    check_error[i].style.display = type_display
                }
        }

        // Remueve los gif
        let remove = document.getElementById("result-search")
        while (remove.firstChild) {
            remove.removeChild(remove.lastChild)
        }

        let searchGif = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=`
        let namegif = document.getElementById("intro").value;


        fetch(`${searchGif}${namegif}`)
        .then(response => response.json())
        .then(response => {
            check_namegif("none")
            console.log(`Hizo un then ${response}`)
            for (let i=0; i < 12; i++) {
                let random = Math.floor(Math.random()* (response.data.length-1))
                let createImg = document.getElementById("result-search")
                let createbox = document.createElement('img')
                createbox.src = response.data[random].images.original.url
                createbox.classList.add('square_gif')
                createbox.setAttribute("id", `imgGif${[i]}`);
                createImg.appendChild(createbox)
            }
        })
        .catch( error => {
            console.log(`Hizo un error ${error}`)
            if (!namegif == "") {
                check_namegif("flex")
            }
        })
})