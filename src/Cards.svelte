<script>
    import Card from "./Card.svelte";

    window.onload = function() {
        let cards = document.getElementsByClassName("card");

        function initCards(card, index) {
        var newCards = document.querySelectorAll('.card:not(.removed)');

        newCards.forEach(function (card, index) {
            card.style.zIndex = cards.length - index;
            card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
            card.style.opacity = (10 - index) / 10;
        });
        }

        initCards();
    }
</script>

<div class="cards">
    <Card/>
    <Card/>
    <Card/>
</div>


<style>
.cards{
    flex-grow: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
</style>