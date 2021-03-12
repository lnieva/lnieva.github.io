const autocomplete = "https://api.giphy.com/v1/gifs/search/tags?"

const form_Search = document.querySelector('.form_Search')
const input_Search = document.querySelector('.form_Search > input')
const button_Search = document.querySelector('#icon-search')
const search_Autocomplete = document.querySelector('.searchAutocomplete')
const searchmenu__height = document.querySelector('.searchmenu__container')

const searchSuggestions = async term => {
    const response = await fetch(`${autocomplete}q=${term}&api_key=${apiKey}
    `)
    const responseJson = await response.json()
    search_Autocomplete.innerHTML = ''

    responseJson.data.slice(0, 5).forEach(suggest => {
        const container_lupa_item = document.createElement('div')
        container_lupa_item.classList.add('container_lupa_item')
        const lupa_item = document.createElement('img')
        container_lupa_item.classList.add('container_lupa_item__lupa')
        const dark = localStorage.getItem("body");
        if (dark === "dark") {
          lupa_item.src = '../icons/icon-search-2-noc.jpg'
        }else{
          lupa_item.src = '../icons/icon-search-2.jpg'
        }
        const item_link = document.createElement('li')
        const item = document.createElement('a')
        item.setAttribute("href", "#intro");
        item.setAttribute("title", `${suggest.name}`);
        item.classList.add('container_lupa_item__item')
        item.setAttribute("onclick", "autocomplete_updateValue(this.title, event)");
        item.textContent = suggest.name
        search_Autocomplete.appendChild(container_lupa_item)
        container_lupa_item.appendChild(lupa_item)
        container_lupa_item.appendChild(item_link)
        item_link.appendChild(item)
    })
  }

const container_lupa_item__lupa = document.querySelector('#icon-search_active')

button_Search.addEventListener('submit', e => {
    e.preventDefault(); // form no te envies
})

container_lupa_item__lupa.addEventListener('submit', e => {
  e.preventDefault(); // form no te envies
})

input_Search.addEventListener('keyup', e => {
  searchSuggestions(input_Search.value)
  icon_search_close()
})

// Seleccionamos uno de los nombres del autoplete
function autocomplete_updateValue(val, event) {
  document.getElementById("intro").value = val;
  event.preventDefault();
  search_gifos()
  icon_search_close()
  search_Autocomplete.innerHTML = ''
}