const ourDiv =document.getElementById('games-grid')
for(let a of JSON.parse(localStorage.getItem('games2'))){
    ourDiv.innerHTML += a
}
