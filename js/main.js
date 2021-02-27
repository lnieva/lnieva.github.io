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

// ------ BOTONES SLIDER ------

document.querySelector('#slider-left').addEventListener("click", () => {
    document.querySelector('#createImg').scrollLeft += 200;
})
document.querySelector('#slider-right').addEventListener("click", () => {
     document.querySelector('#createImg').scrollLeft -= 200;
})