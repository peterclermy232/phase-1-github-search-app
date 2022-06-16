document.querySelector("form").addEventListener("submit", e => search(e))

function search(event) {
    event.preventDefault()
    const name = event.target.firstElementChild.value
    const configurationObject = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"

        },
    };
    fetch(`https://api.github.com/search/users?q=${name}`, configurationObject).then(respone => respone.json()).then(json => renderResponse(json))
}

function renderResponse(json) {
    for (let i = 0; i < json.items.length; i++) {
        const name = json.items[i].login
        const li = document.createElement("li")
        const div = document.createElement("div")
        div.innerText = name
        div.addEventListener("click", e => getRepos(e))
        li.append(div)
        document.getElementById("user-list").append(li)
    }
}

function getRepos(event) {
    const name = event.target.innerText
    const configurationObject = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"

        },
    };
    fetch(`https://api.github.com/users/${name}/repos`, configurationObject).then(respone => respone.json()).then(json => renderRepos(json))

}

function renderRepos(json) {
    for (const repo of json) {
        const repoName = repo.name
        const url = repo.html_url
        const a = document.createElement("a")
        a.href = url
        a.innerText = repoName
        const div = document.createElement("div")
        div.append(a)
        document.getElementById("repos-list").append(div)
    }
}