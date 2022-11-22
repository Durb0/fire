<script>    
    import CardItem from "./CardItem.svelte";
    import {initCards} from "../utils/func.js";
    import {w_cards} from "../utils/store.js";

    let el;

    let list_of_cards;

    w_cards.subscribe(value => {
        list_of_cards = value;
        initCards();
    });

    window.addEventListener("remove_first_card", function(){
        $w_cards.slice(1);
    });
</script>

<div class="cards" bind:this={el}>
    {#each list_of_cards as card,index (card.entry_id)}
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