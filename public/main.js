window.addEventListener('DOMContentLoaded',start)

function start(){
    console.log("[start] Starting Function")
    const form = document.querySelector('form')
    const input = document.querySelector('input[type=text]')
    const repoContentContainer = document.querySelector('.content')
    const getUrlOfApi = repo => `https://api.github.com/search/repositories?q=${repo}`
    const historyOfSearchs = []

    console.log("[start at main.js] Variables are just declared")

    form.addEventListener('submit',handleSubmit)
    console.log("[start at main.js] Listening Click event of submit button")

    async function handleSubmit(event){
        try{
            console.log('[handleSubmit] Starting Function')
            event.preventDefault()
            if(input.value.trim() === '') throw new Error('Fill in all fields')
            console.log('[handleSubmit] Without errors')
            const repoContentObject = await fetchReposFromApi()
            console.log('[handleSubmit] Take the repo from  fetchReposFromApi')
            displayContentOfRepoInContainer(repoContentObject)
        }catch(error){
            console.log('[handleSubmit] Error:Fill in all fields')
            alert(error)
        }
    }

    async function fetchReposFromApi(){
        try{
            console.log("[fetchReposFromApi] Starting Function")
            const repo = input.value.trim()
            const repoGitHubUrl = getUrlOfApi(repo)
            console.log("[fetchReposFromApi] Starting Promise")
            const resultOfApi = await fetch(repoGitHubUrl)
            if(resultOfApi.statusText !== 'OK') {
                throw new Error("That repository was not found")
            }
            console.log("[fetchReposFromApi] API returned")
            const resultOfApiInJson = await resultOfApi.json()
            const repoFounded = resultOfApiInJson.items[0]
            console.log("[fetchReposFromApi] End of function")
            return repoFounded
        }catch(error){
            console.log("[fetchReposFromApi] ERROR:")
            console.error(error)
            alert(error)
        }
    }
    
    function displayContentOfRepoInContainer(contentOfRepoObject){
        console.log("[displayContentOfRepoInContainer] Starting Function")
        const { full_name, owner, forks} = contentOfRepoObject;
        const { login, avatar_url } = owner
        console.log("[displayContentOfRepoInContainer] Variables are just declared")
        const displayContentOfRepo = `
            <div class="repo-img">
                <img class="avatar_img" src="${avatar_url}" alt="${login}" />
            </div>

            <div class="repo-info">
                <p>Repo: <a href="https://github.com/${full_name}">${full_name}</a></p>
                <p>Made by <a href="https://github.com/${login}">${login}</a></p>
                <p>${forks} Forks</p>
            </div>
        `

        if(historyOfSearchs.length === 0){ 
            repoContentContainer.innerHTML = displayContentOfRepo
        }

        else if(historyOfSearchs[historyOfSearchs.length - 1].archive_url != contentOfRepoObject.archive_url) { 
            repoContentContainer.innerHTML += displayContentOfRepo
        }
        
        historyOfSearchs.push(contentOfRepoObject)
        console.log("[displayContentOfRepoInContainer] Content are in HTML")
    }
}

