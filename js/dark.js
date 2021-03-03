function body_dark () {
    const dark = localStorage.getItem("body");
    if (dark === "dark") {
            document.body.classList.add('dark')
    }else{
            document.body.classList.remove('dark')
    }
}

body_dark()
