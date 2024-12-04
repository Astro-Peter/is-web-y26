// lab5.js
const itemSelect = document.getElementById('itemSelect');
const winnerSelect = document.getElementById('winnerSelect')
const addItemButton = document.getElementById('addItemButton');
const dynamicList = document.getElementById('dynamicList');

// Load from localStorage
function loadItems() {
    const savedItems = localStorage.getItem('listItems');
    const savedWinners = localStorage.getItem('winners');
    const savedGames = localStorage.getItem('games');
    if (savedItems) {
        items = JSON.parse(savedItems);
        winners = JSON.parse(savedWinners);
        games = JSON.parse(savedGames);
        for (let index = 0; index < items.length; index++) {
            addItemToList(items[index], games[index], winners[index]);
        }
    }
    selectorChange()
}

function selectorChange() {
    const games = Array.from(dynamicList.children).map(item => item.attributes.game.textContent);
    if (games.findIndex(item => item === itemSelect.value) !== -1) {
        addItemButton.textContent = "Change Prediction";
    } else {
        addItemButton.textContent = "Add Prediction";
    }
}

function addItemToList(itemText, game, winner) {
    let listItem = document.createElement('li');
    const games = Array.from(dynamicList.children).map(item => item.attributes.game.textContent);
    const winners = Array.from(dynamicList.children).map(item => item.attributes.winner.textContent);
    console.log(games, game);
    game_index = games.findIndex(item => item === game);
    if (game_index !== -1) {
        listItem = dynamicList.children[game_index];
        console.log(listItem);

    }
    listItem.textContent = itemText;
    listItem.setAttribute("class", winner);
    listItem.setAttribute("game", game);
    listItem.setAttribute("winner", winner);
    dynamicList.appendChild(listItem);
}


function saveItems() {
    const listItems = Array.from(dynamicList.children).map(item => item.textContent);
    // Array.from(dynamicList.children).map(item => console.log(item.attributes.winner));
    const winners = Array.from(dynamicList.children).map(item => item.attributes.winner.textContent);
    const games = Array.from(dynamicList.children).map(item => item.attributes.game.textContent);
    console.log(winners);
    
    localStorage.setItem('listItems', JSON.stringify(listItems));
    localStorage.setItem('games', JSON.stringify(games));
    localStorage.setItem('winners', JSON.stringify(winners));
}


itemSelect.addEventListener('change', () =>{
    const games = Array.from(dynamicList.children).map(item => item.attributes.game.textContent);
    if (games.findIndex(item => item === itemSelect.value) !== -1) {
        addItemButton.textContent = "Change Prediction";
    } else {
        addItemButton.textContent = "Add Prediction";
    }
});


addItemButton.addEventListener('click', () => {
    addItemButton.textContent = "Change Prediction";
    const selectedItem = itemSelect.value;
    const selectedOption = itemSelect.options[itemSelect.selectedIndex];
    // console.log()
    const selectedWinner = winnerSelect.value;
    addItemToList(selectedOption.textContent, selectedItem, selectedWinner);
    saveItems();
});


window.addEventListener('load', loadItems);