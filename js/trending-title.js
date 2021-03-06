// ------ TRENDINGS ------

fetch(`${urltrending}${apiKey}`)
    .then(response => response.json())
    .then(response => {
        const arrayTerms = response.data.slice(0,5)
        arrayTerms.forEach(trending => {
            const paragraph = document.querySelector('#title3')
            const item = document.createElement('a')
            item.setAttribute("href", "#intro");
            item.setAttribute("title", `${trending}`);
            item.setAttribute("id", "setinput");
            item.setAttribute("onclick", "updateValue(this.title, event)");
            item.textContent = ` ${trending}, `
            paragraph.appendChild(item)
        })

    })
    .catch(error => {
        console.error(error)
        alert(`Hay un problema para visualizar los 5 Trendings`)
    })

function updateValue(val, event) {
    document.getElementById("intro").value = val;
    event.preventDefault();
    removeAll()
    button_view_disable()
    search_gifos()
    icon_search_close()
}