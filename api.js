const jokeBtn = document.getElementById("jokeBtn");
const setup = document.getElementById("setup");
const punchline = document.getElementById("punchline");
getJoke();
jokeBtn.addEventListener("click", getJoke);

function getJoke(){
    setup.innerHTML = "Loading joke...";
    punchline.innerHTML = "";
    fetch("https://official-joke-api.appspot.com/random_joke")
    .then(response => response.json())
    .then(data => {
        setup.innerHTML = data.setup;
        punchline.innerHTML = data.punchline;
    })
    .catch(() => {
        setup.innerHTML = "Oops! Couldn't load a joke.";
        punchline.innerHTML = "Please check your internet connection.";
    });
}