<script>
    import { w_game } from '../../utils/store.js';
    import CardItem from '../items/CardItem.svelte';

    let element;

    let list_of_cards;

    w_game.subscribe(game => {
        list_of_cards = game.deck;
    });

    window.addEventListener('load', () => {
        resizeCard();
    });
    

    window.addEventListener('resize', function() {
        resizeCard();
    });

    function resizeCard(){
        var size = 0;
        
        var width = element.clientWidth;
        var height = element.clientHeight;
        if(width > height){
            //height size
            size = height*0.9;
        }else{
            //width size
            size = width*0.9;
        }
        document.body.style.setProperty('--card_size', size+'px');
    }

</script>

<div class="playground" bind:this={element} >
    {#each list_of_cards as card,index (card.entry_id)}
        <CardItem card={card} index={index}/>
    {/each}
</div>


<style>

    .playground{
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        height: -webkit-fill-available;
    }
</style>