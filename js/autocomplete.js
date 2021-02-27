const autocomplete = `https://api.giphy.com/v1/gifs/search/tags?`

const form_Search = document.querySelector('.form_Search')
const input_Search = document.querySelector('.form_Search > input')
const button_Search = document.querySelector('#icon-search')
const search_Autocomplete = document.querySelector('.searchAutocomplete')

const searchSuggestions = async term => {
    const response = await fetch(`${autocomplete}q=${term}&api_key=${apiKey}
    `)
    const responseJson = await response.json()
    search_Autocomplete.innerHTML = ''
    responseJson.data.slice(0, 5).forEach(suggest => {
      const item = document.createElement('li')
      item.textContent = suggest.name
      search_Autocomplete.appendChild(item)
    })
  }
  
  form_Search.addEventListener('submit', e => {
    e.preventDefault(); // form no te envies
    console.log('ejecutar busqueda')
  })
  
  input_Search.addEventListener('keyup', e => {
    searchSuggestions(input_Search.value)
  })




// const autocomplete = `https://api.giphy.com/v1/gifs/search/tags?`

// let input_search = document.getElementById("search")

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