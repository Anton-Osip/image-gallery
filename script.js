const AccessKey = 'H0yG9_2vLtbLXujsCwxgJ8rP-43UgASaNh3HuLABRbg'
const gridElement = document.querySelector('.grid')
const inputElement = document.querySelector('.header__search>input')
const sendElement = document.querySelector('.search__img')
const resetInput = document.querySelector('.resetInput')

const drawLoader = () => {
    gridElement.innerHTML = ''
    gridElement.innerHTML = '<div class="loader"></div>'
}
const fetchPhotos = () => {
    drawLoader()
    const url = `https://api.unsplash.com/photos/?client_id=${AccessKey}&per_page=30`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const arr = []
            data.map(photo =>
                arr.push(
                    {id: data.id, likes: photo.likes, color: photo.color, urls: photo.urls.regular}
                )
            )
            return arr
        })
        .then(data => {
            drawImage(data)
        })
}

drawImage = (arr) => {
    gridElement.innerHTML = ''
    arr.map(image => {
        gridElement.insertAdjacentHTML('beforeend', `
<div class="img" style="background-image: url('${image.urls}')" id="${image.id}">
</div>
        `)
    })
}

const searchPhotos = (query) => {
    drawLoader()
    const url = `https://api.unsplash.com/search/photos/?client_id=${AccessKey}&per_page=30&query=${query}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const arr = []
            if (data.results.length === 0) throw new Error('Nothing found for your request')
            data.results.map(photo => {
                    arr.push(
                        {id: data.id, likes: photo.likes, color: photo.color, urls: photo.urls.regular}
                    )

                }
            )
            return arr
        })
        .then((data) => {
            drawImage(data)
        })
        .catch(err => {
            gridElement.innerHTML = ''
            gridElement.innerHTML = `
            <h1 class="error">${err.message}</h1>
            `
        })

}

fetchPhotos()
const sendInput = (event) => {
    const text = event.currentTarget.value
    if (event.keyCode === 13 && text.length !== 0) {
        searchPhotos(text)
    }

}

inputElement.addEventListener('keyup', sendInput)
sendElement.addEventListener('click', () => {
    const text = inputElement.value
    if (text.length !== 0) {
        searchPhotos(text)
    }
})

resetInput.addEventListener('click', () => {
        inputElement.value = ''
    }
)
