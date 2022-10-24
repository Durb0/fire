<script>    
    import CardItem from "./CardItem.svelte";
    import {initCards} from "./func.js";
    import {game} from "./main.js";

    window.onload = function() {
        
        initCards();
    }
        
</script>

<div class="cards">
    {#await game.cards}
        <div>loading...</div>
    {:then cards}
        {#each cards as card}
            <CardItem card={card}/>
        {/each}
    {:catch error}
        <div>error</div>
    {/await}
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