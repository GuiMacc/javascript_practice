const cardArray = [
    {
        name: 'fries',
        img: 'img/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'img/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'img/pizza.png'
    },
    {
        name: 'fries',
        img: 'img/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'img/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'img/pizza.png'
    }
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];
const result = document.querySelector("#result");

function createBoard() {
    for (let i = 0; i < cardArray.length; i++){
        const card = document.createElement("img");
        card.setAttribute("src", "img/blank.png");
        card.setAttribute("data-id", i);
        card.addEventListener("click", flipCard);
        gridDisplay.append(card);
    }
}

createBoard();

function checkMatch() {
    const cards =  document.querySelectorAll("#grid img");
    const optionIdOne = cardsChosenIds[0];
    const optionIdTwo = cardsChosenIds[1];
    if (optionIdOne == optionIdTwo) {
        alert("Clicaste na mesma carta!");
        cards[optionIdOne].setAttribute("src", "img/blank.png");
    } else if (cardsChosen[0] == cardsChosen[1]) {
        alert("Boa! Acertaste.");
        cards[optionIdOne].setAttribute("src", "img/white.png");
        cards[optionIdTwo].setAttribute("src", "img/white.png");
        cards[optionIdOne].removeEventListener("click", flipCard);
        cards[optionIdTwo].removeEventListener("click", flipCard);
        cardsWon.push(cardsChosen);
    } else {
        alert("Bah... Tenta outra vez!");
        cards[optionIdOne].setAttribute("src", "img/blank.png");
        cards[optionIdTwo].setAttribute("src", "img/blank.png");
    }
    
    cardsChosen = [];
    cardsChosenIds = [];
    if (cardsWon.length == cardArray.length/2) {
        result.innerHTML = "GANHASTE!!!!";
    } else {
        result.innerHTML = cardsWon.length;
    }
} 

function flipCard() {
    const cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    console.log("clicaste", cardId);
    console.log(cardsChosen);
    console.log(cardsChosenIds);
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }

}