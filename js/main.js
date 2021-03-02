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

