const formSearch = document.querySelector('.formSearch')
const inputSearch = document.querySelector('.formSearch > input')
const buttonSearch = document.querySelector('.formSearch > button')
const searchAutocomplete = document.querySelector('.searchAutocomplete')
const maximizeGif = document.querySelectorAll('.maximizeGif')
const fullGif = document.querySelector('.fullGif')
const fullGifClose = document.querySelector('.fullGif__close')


const API_KEY = 'yTCjv2UMQEL7ayD0GnIrM7i1anyTY3Ov'

const searchSuggestions = async term => {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search/tags?q=${term}&api_key=${API_KEY}
  `)
  const responseJson = await response.json()
  searchAutocomplete.innerHTML = ''
  responseJson.data.slice(0, 5).forEach(suggest => {
    const item = document.createElement('li')
    item.textContent = suggest.name
    searchAutocomplete.appendChild(item)
  })
}

formSearch.addEventListener('submit', e => {
  e.preventDefault(); // form no te envies
  console.log('ejecutar busqueda')
})

inputSearch.addEventListener('keyup', e => {
  searchSuggestions(inputSearch.value)
})

for(let i=0; i < maximizeGif.length;i++) {
  maximizeGif[i].addEventListener('click', e => {
    const imageUrl = e.currentTarget.getAttribute('data-image')
    fullGif.classList.add('show')
    const content = document.createElement('div')
    content.classList.add('content')
    const image = document.createElement('img')
    image.src = imageUrl
    content.appendChild(image)
    fullGif.appendChild(content)
  })
}

fullGifClose.addEventListener('click', () => {
  fullGif.querySelector('.content').remove()
  fullGif.classList.remove('show')
})