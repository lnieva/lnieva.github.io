// ------ BOTON BURGER ------
let checkburger = document.getElementById("checkbox");
checkburger.addEventListener("click",
    function change () {
    if (!document.body.classList[0]) {
        document.getElementById("burger-dark").classList.add('displaynone');
        document.getElementById("close-dark").classList.add('displaynone');
        document.getElementById("burger").classList.toggle('displaynone');
        document.getElementById("close").classList.toggle('displaynone');
    }else{
        document.getElementById("close").classList.add('displaynone');
        document.getElementById("burger").classList.add('displaynone');
        document.getElementById("burger-dark").classList.toggle('displaynone');
        document.getElementById("close-dark").classList.toggle('displaynone');
    }
});



