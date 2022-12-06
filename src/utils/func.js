// Card function
// ===============
function initCards() {
    var cards = document.querySelectorAll('.card:not(.removed)');
    if (cards.length > 0){
        cards.forEach((card,index) => {
            card.style.zIndex = cards.length - index;
            //card.style.transform = 'scale(' + (20 - index) / 20 + ')';
            card.style.opacity = (10 - index) / 10;
        }
    );}
    //console log len of w_cards
    //get first card
    flipFirstCard();
}

function flipFirstCard(){
    var cards = document.querySelectorAll('.card:not(.removed)');
    let firstCard = cards[0];
    if(firstCard){
        flipCard(firstCard);
    }
}

function flipCard(card){
    if (card) {
        card.classList.toggle('flipped');
        //TODO: Mettre ça dans l'item
        var cardInner = card.querySelector('.card__inner');
        cardInner.style.transform = 'rotateY(180deg)';
    }
}

export { initCards, flipFirstCard };