// ------ VARIABLES ------

const apiKey = "yTCjv2UMQEL7ayD0GnIrM7i1anyTY3Ov"
const urltrending = "https://api.giphy.com/v1/trending/searches?api_key="
const randomGif = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=`

// ------ BOTON BURGER ------

let checkburger = document.getElementById("checkbox");
checkburger.addEventListener("click",
    function change () {
    let check = document.getElementById("burger").className
    if (check === "displayblock") {
        document.getElementById("burger").classList.remove('displayblock');
        document.getElementById("burger").classList.add('displaynone');
        document.getElementById("close").classList.remove('displaynone');
        document.getElementById("close").classList.add('displayblock');
    } else {
        document.getElementById("burger").classList.remove('displaynone');
        document.getElementById("burger").classList.add('displayblock');
        document.getElementById("close").classList.remove('displayblock');
        document.getElementById("close").classList.add('displaynone');
    }

});

// // ------ TRENDINGS ------

// fetch(`${urltrending}${apiKey}`)
//     .then(response => response.json())
//     .then(response => {
//         const arrayTerms = response.data.slice(0,5)
//         arrayTerms.forEach(trending => {
//             const paragraph = document.querySelector('#title3')
//             const item = document.createElement('a')
//             item.setAttribute("href", "#intro");
//             item.setAttribute("title", `${trending}`);
//             item.setAttribute("id", "setinput");
//             item.setAttribute("onclick", "updateValue(this.title, event)");
//             item.textContent = ` ${trending}, `
//             paragraph.appendChild(item)
//         })

// })

// function updateValue(val, event) {
//     document.getElementById("intro").value = val;
//     event.preventDefault();
// }


// ------ BOTONES SLIDER ------

document.querySelector('#slider-left').addEventListener("click", () => {
    document.querySelector('#createImg').scrollLeft += 200;
})
document.querySelector('#slider-right').addEventListener("click", () => {
     document.querySelector('#createImg').scrollLeft -= 200;
})