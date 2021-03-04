window.addEventListener('resize', function() {
	if (window.innerWidth <= 1070) {
		window.location.href = "../index.html"; 
	}
});

// Dark Mode
document.querySelector('.button_dark').addEventListener("click", () => {
    document.body.classList.toggle('dark')
    if ( document.body.classList[0]){
        localStorage.setItem('body', 'dark');
    }else{
        localStorage.removeItem('body');
    }
})

document.querySelector('.button_rec_active').addEventListener("click", () => {
    document.querySelector('.title-crear-h1').classList.toggle('displaynone')
    document.querySelector('.title-crear-p1').classList.toggle('displaynone')
    document.querySelector('.title-crear-h2').classList.toggle('displaynone')
    document.querySelector('.title-crear-p2').classList.toggle('displaynone')

})



