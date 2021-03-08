gifos = JSON.parse(window.localStorage.getItem('misgifos'))

const misgifos = document.querySelector('.misgifos')

const API_KEY = '5296N97M94Fl7EKKQrVjAuKMfDpFWk4L'

getGifos = async () => {
    const response = await fetch(`https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${gifos.join()}`)
    const result = await response.json()
    result.data.forEach(gif => {
        const image = document.createElement('img')
        image.src = gif.images.original.url
        misgifos.appendChild(image)
    })
}

getGifos()