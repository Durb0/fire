function initCards() {
    let cards = document.getElementsByClassName("card");
    var newCards = document.querySelectorAll('.card:not(.removed)');

    

    if (newCards.length > 0){
        newCards.forEach(function (card, index) {
            card.style.zIndex = cards.length - index;
            card.style.transform = 'scale(' + (20 - index) / 20 + ')';
            card.style.opacity = (10 - index) / 10;
        });

        var card = newCards[0]; // first card
        if (card) {
            var cardInner = card.querySelector('.card_inner');
            cardInner.style.transform = 'rotateY(180deg)';
        }
    }
}

export { initCards };