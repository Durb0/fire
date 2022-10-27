<script>    
    import CardItem from "./CardItem.svelte";
    import {initCards} from "./func.js";
    import {w_cards} from "./store.js";

    let el;

    let list_of_cards;

    w_cards.subscribe(value => {
        list_of_cards = value;
        initCards();
        console.log("list_of_cards", list_of_cards);
    });

    window.addEventListener("remove_first_card", function(){
        $w_cards.slice(1);
        console.log ("remove_first_card");
    });
</script>

<div class="cards" bind:this={el}>
    {#each list_of_cards as card,index (card.id)}
        <CardItem card={card} index={index}/>
    {/each}

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