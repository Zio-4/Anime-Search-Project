const baseURL = "https://kitsu.io/api/edge/anime"


fetch(baseURL)
.then(resp => resp.json())
.then(resp => {
    console.log(resp)
})