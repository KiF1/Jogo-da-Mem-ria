const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"
const flipSound = document.getElementById('flipSound')




startGame();


function startGame(){
    initializeCards( game.createCardsFromTechs());
    game.unFlipStartGame();

}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';

    game.cards.forEach(card =>{
let cardElement = document.createElement('div');
cardElement.id = card.id;
cardElement.classList.add(CARD)
cardElement.dataset.icon = card.icon;
cardElement.classList.add('flip');
createCardContent(card, cardElement);


cardElement.addEventListener('click', flipcard)
gameBoard.appendChild(cardElement);
    })
    
}

function createCardContent(card, cardElement){
createCardFace(FRONT, card, cardElement);
createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face === FRONT){
let iconElement = document.createElement('img');
iconElement.classList.add(ICON);
iconElement.src = "./imagens/" + card.icon + ".png";
cardElementFace.appendChild(iconElement);
    }else{
        let iconElement =document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./imagens/programacao.png";
        cardElementFace.appendChild(iconElement)
        
    }
    element.appendChild(cardElementFace);
}




function flipcard(){
    if (game.lockMode === false) {
        flipGameSound();
if(game.setCard(this.id)){

    this.classList.add("flip");
    if(game.secondCard){
   if (game.checkMatch()){
game.clearCards();
if(game.checkGameOver()){
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = "flex";
}

   } else{
       setTimeout(()=>{
       let firstCardView = document.getElementById(game.firstCard.id);
       let secondCardView = document.getElementById(game.secondCard.id);

       firstCardView.classList.remove("flip");
       secondCardView.classList.remove("flip");
       game.unflipCards();
       },1000);
   };
}
}
    }
}

function iniciar() {
    game.clearCards();
    startGame();
    let newGameLayer = document.getElementById('newGame')
    newGameLayer.style.display = 'none'
}

function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = "none";
}

function flipGameSound() {

    flipSound.duration = 0.1
    flipSound.volume = 0.1
    flipSound.play()
}
