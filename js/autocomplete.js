const autocomplete = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=`

let input_search = document.getElementById("search")

// input_search.onkeypress = function(event) {
//     let autoGif = document.getElementById("change").innerHTML
//     autoGif += String.fromCharCode(event.keyCode);
//     fetch(`${autocomplete}${autoGif}`)
//         .then(response => response.json())
//         .then(response => {
//             const arrayGif = response.data.slice(0,5)
//             let autoGif_create = document.createElement("div")
//             arrayGif.forEach( element => {
//                 autoGif_create.remove()
//                 autoGif_create.textContent = element.name
//                 input_search.appendChild(autoGif_create)
//             })
//         })
//   }


// let input_search = document.getElementById("search")

// input_search.onkeypress = function(event) {
//     document.getElementById("change").innerHTML += String.fromCharCode(event.keyCode);
//   }