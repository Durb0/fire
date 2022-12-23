<!--
    @component

    Centre de jeu de la partie
    Affiche les cartes
-->


<script>
  import { onMount } from 'svelte';

    //import du store
    import { w_game } from '../../utils/store.js';

    //import du composant CardItem
    import CardItem from '../items/CardItem.svelte';

    let playground; //référence à l'élément HTML du playground

    /**
     * @param {Card[]} list_of_cards - liste des cartes
     */
    export let list_of_cards;


    // subscribtion au store pour mettre à jour la liste des cartes
    w_game.subscribe(game => {
        list_of_cards = game.deck;
    });


    // evenements pour mettre à jour la taille des cartes
    window.addEventListener('load', () => {
        updateCardSize();
    });
    window.addEventListener('resize', function() {
        updateCardSize();
    });
    window.addEventListener('hashchange', function() {
        updateCardSize();
    });

    onMount(() => {
        updateCardSize();
    });


    /**
     * Fonction qui met à jour la taille des cartes
     * 
     * TODO: mettre à jour la taille lors du chargement de la page 
     */
    function updateCardSize(){
        var size = 0;
        if (playground == null){
            return;
        }
        var width = playground.offsetWidth;
        var height = playground.offsetHeight;
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

<div class="playground" bind:this={playground} >
    {#if list_of_cards.length == 0}
        <span class="playground__wait">
            En attente d'intervention
        </span>
    {:else}
        {#each list_of_cards as card,index (card.entry_id)}
            <CardItem card={card} index={index}/>
        {/each}
    {/if}
</div>


<style>

    .playground{
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        height: -webkit-fill-available;
    }

    .playground__wait{
        font-size: 2em;
        font-weight: bold;
        color: #0E99DA;
    }
</style>