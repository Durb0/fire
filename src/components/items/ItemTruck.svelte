<script>
    import { w_game } from '../../utils/store.js';
    import { StateRessource } from '../../models/Enums';
    import { onMount } from 'svelte';
    import { Snackbar, Button, MaterialApp } from 'svelte-materialify';
    import { url } from "../../utils/socket.js";

    export let truck;
    let el;

    let snackbar = false;

    let game;

    w_game.subscribe(value => {
        game = value;
    });

    onMount(() => {
        setStyleItem();
    });

    /**
     * Fonction qui change le style selon l'etat du pompier
     */
    function setStyleItem(){
        //remove all class with item-
        el.classList.remove(...el.classList.value.split(' ').filter(c => c.startsWith('item-')));
        //add class item-<etat>
        el.classList.add('item-'+truck.state);
    }

    function handleClickItem(){
        console.log(truck);
        console.log(game);
        if(truck.state == StateRessource.AVAILABLE){
                truck.state = StateRessource.SELECTED;
                game.deck[0].means_move.addTruck(truck);
        }else{
            if(game.deck[0].means_move.countFireFighters() <= (game.deck[0].means_move.getSizeMaxOfTrucks() - truck.nb_seat_max)){
                truck.state = StateRessource.AVAILABLE;
                game.deck[0].means_move.removeTruck(truck);
            } else {
                snackbar = true;
            }
        }
        setStyleItem();
        w_game.update(game => game);
    }

</script>
    
<div bind:this={el} class="item item_truck" on:click={handleClickItem} on:keypress={handleClickItem} >
    <div class="item_panel">
        <p>{truck.name}</p>
        <img src="{url}/truck/{truck.name}.svg" alt="{truck.name}" />
    </div>
    <div class="item_panel">

    </div>
</div>
<Snackbar class="flex-column" bind:active={snackbar} bottom center timeout={2000}>
    <h5>Impossible de retirer le véhicule</h5>
    <p>Trop de Sapeurs-pompiers sur l'opération par rapport au nombre de places dans les véhicules</p>
    <div class="mt-1">
        <Button text class="success-text">Accept</Button>
        <Button
        class="red-text"
        text
        on:click={() => {
            snackbar = false;
        }}>
        Dismiss
        </Button>
    </div>
</Snackbar>


<style>

.item_panel{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.item_truck{
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;
    width: 250px;
    height: 100px;
}
</style>